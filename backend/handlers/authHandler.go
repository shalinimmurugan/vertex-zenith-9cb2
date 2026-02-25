package handlers

import (
	"encoding/json"
	"net/http"
	"backend/db"
	"backend/models"
	"backend/utils"
	"backend/views"
	"golang.org/x/crypto/bcrypt"
)

func Login(w http.ResponseWriter, r *http.Request) {
	var req views.LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		utils.SendError(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.Email == "" || req.Password == "" {
		utils.SendError(w, "Email and password are required", http.StatusBadRequest)
		return
	}

	var user models.User
	if err := db.DB.Where("email = ?", utils.SanitizeString(req.Email)).First(&user).Error; err != nil {
		utils.SendError(w, "Invalid email or password", http.StatusUnauthorized)
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
		utils.SendError(w, "Invalid email or password", http.StatusUnauthorized)
		return
	}

	token := "dummy-jwt-token"

	utils.SendSuccess(w, views.LoginResponse{
		Token: token,
		User: struct {
			ID    int64  `json:"id"`
			Name  string `json:"name"`
			Email string `json:"email"`
		}{
			ID:    user.ID,
			Name:  user.Name,
			Email: user.Email,
		},
	})
}
