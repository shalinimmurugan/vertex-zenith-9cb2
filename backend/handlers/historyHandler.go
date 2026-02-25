package handlers

import (
	"net/http"
	"backend/db"
	"backend/models"
	"backend/utils"
	"backend/views"
)

func GetUserHistory(w http.ResponseWriter, r *http.Request) {
	userID := r.Header.Get("X-User-ID")
	if userID == "" {
		utils.SendError(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	var histories []models.History
	if err := db.DB.Where("user_id = ?", userID).Order("created_at desc").Find(&histories).Error; err != nil {
		utils.SendError(w, "Failed to fetch history", http.StatusInternalServerError)
		return
	}

	items := make([]views.HistoryItem, len(histories))
	for i, h := range histories {
		items[i] = views.HistoryItem{
			ID:        h.ID,
			Query:     h.Query,
			Response:  h.Response,
			Type:      h.Type,
			CreatedAt: h.CreatedAt.Format("2006-01-02T15:04:05Z"),
		}
	}

	utils.SendSuccess(w, views.HistoryResponse{Items: items})
}
