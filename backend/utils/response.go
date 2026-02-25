package utils

import (
	"encoding/json"
	"net/http"
	"backend/views"
)

func SendSuccess(w http.ResponseWriter, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(views.Response{
		Success: true,
		Data:    data,
	})
}

func SendError(w http.ResponseWriter, message string, statusCode int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	json.NewEncoder(w).Encode(views.ErrorResponse{
		Success: false,
		Error:   message,
	})
}
