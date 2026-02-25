package handlers

import (
	"encoding/json"
	"net/http"
	"backend/db"
	"backend/models"
	"backend/utils"
	"backend/views"
)

func GenerateAIImage(w http.ResponseWriter, r *http.Request) {
	userID := r.Header.Get("X-User-ID")
	if userID == "" {
		utils.SendError(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	var req views.ImageRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.SendError(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.Description == "" {
		utils.SendError(w, "Description is required", http.StatusBadRequest)
		return
	}

	if req.Type == "" {
		req.Type = "flowchart"
	}

	imageURL := "https://example.com/images/simulated-ml-diagram.png"
	altText := "Generated ML " + req.Type + " for: " + req.Description

	history := models.History{
		Query:    req.Description,
		Response: imageURL,
		Type:     "image",
		UserID:   1,
	}
	if err := db.DB.Create(&history).Error; err != nil {
		utils.SendError(w, "Failed to save history", http.StatusInternalServerError)
		return
	}

	utils.SendSuccess(w, views.ImageResponse{
		ImageURL: imageURL,
		AltText:  altText,
	})
}
