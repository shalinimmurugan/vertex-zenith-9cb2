package handlers

import (
	"encoding/json"
	"net/http"
	"backend/db"
	"backend/models"
	"backend/utils"
	"backend/views"
)

func UpdateUserProfile(w http.ResponseWriter, r *http.Request) {
	userID := r.Header.Get("X-User-ID")
	if userID == "" {
		utils.SendError(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	var req views.UpdateProfileRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.SendError(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	var user models.User
	if err := db.DB.First(&user, userID).Error; err != nil {
		utils.SendError(w, "User not found", http.StatusNotFound)
		return
	}

	if req.Name != "" {
		user.Name = utils.SanitizeString(req.Name)
	}
	if req.Email != "" {
		if !utils.IsValidEmail(req.Email) {
			utils.SendError(w, "Invalid email format", http.StatusBadRequest)
			return
		}
		user.Email = utils.SanitizeString(req.Email)
	}

	if err := db.DB.Save(&user).Error; err != nil {
		utils.SendError(w, "Failed to update profile", http.StatusInternalServerError)
		return
	}

	utils.SendSuccess(w, views.UpdateProfileResponse{
		ID:        user.ID,
		Name:      user.Name,
		Email:     user.Email,
		UpdatedAt: user.UpdatedAt.Format("2006-01-02T15:04:05Z"),
	})
}
