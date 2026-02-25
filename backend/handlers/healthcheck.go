package handlers

import (
	"net/http"
	"time"
	"backend/utils"
)

func HealthCheck(w http.ResponseWriter, r *http.Request) {
	utils.SendSuccess(w, map[string]interface{}{
		"message":   "Server is running",
		"timestamp": time.Now().UTC().Format(time.RFC3339),
	})
}
