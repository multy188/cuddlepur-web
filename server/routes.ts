import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  ObjectStorageService,
  ObjectNotFoundError,
} from "./objectStorage";
import { ObjectPermission } from "./objectAcl";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Image upload routes for messaging
  
  // This endpoint serves objects with proper ACL enforcement
  app.get("/objects/:objectPath(*)", async (req, res) => {
    const objectStorageService = new ObjectStorageService();
    try {
      const objectFile = await objectStorageService.getObjectEntityFile(
        req.path,
      );
      
      // Check ACL permissions before serving the object
      const canAccess = await objectStorageService.canAccessObjectEntity({
        objectFile,
        userId: undefined, // No user authentication in this demo
        requestedPermission: ObjectPermission.READ,
      });
      
      if (!canAccess) {
        return res.sendStatus(403);
      }
      
      objectStorageService.downloadObject(objectFile, res);
    } catch (error) {
      console.error("Error accessing object:", error);
      if (error instanceof ObjectNotFoundError) {
        return res.sendStatus(404);
      }
      return res.sendStatus(500);
    }
  });

  // This endpoint is used to get the upload URL for a message image.
  app.post("/api/messages/upload-image", async (req, res) => {
    try {
      const objectStorageService = new ObjectStorageService();
      
      // Generate upload URL with image constraints
      const uploadURL = await objectStorageService.getObjectEntityUploadURL({
        contentType: "image/*",
        maxSize: 10485760, // 10MB max
      });
      
      res.json({ uploadURL });
    } catch (error) {
      console.error("Error generating upload URL:", error);
      res.status(500).json({ error: "Failed to generate upload URL" });
    }
  });

  // An endpoint for finalizing the image upload after uploading to storage
  app.put("/api/messages/finalize-image", async (req, res) => {
    if (!req.body.imageURL) {
      return res.status(400).json({ error: "imageURL is required" });
    }

    try {
      const objectStorageService = new ObjectStorageService();
      const objectPath = objectStorageService.normalizeObjectEntityPath(
        req.body.imageURL,
      );
      
      // Validate that the path is under PRIVATE_OBJECT_DIR
      if (!objectPath.startsWith('/objects/')) {
        return res.status(400).json({ error: "Invalid object path" });
      }
      
      // TODO: Verify the uploaded object is actually an image by checking metadata
      // In a full implementation, you would check the content-type and possibly scan the file

      // For messaging, we'll make images public so they can be shared
      // In a real app, you might want to restrict access based on conversation participants
      const finalizedPath = await objectStorageService.trySetObjectEntityAclPolicy(
        req.body.imageURL,
        {
          owner: "system", // System owns message images
          visibility: "public", // Public for easy sharing in messages
        }
      );

      res.status(200).json({
        objectPath: finalizedPath,
      });
    } catch (error) {
      console.error("Error finalizing image:", error);
      res.status(500).json({ error: "Failed to finalize image upload" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
