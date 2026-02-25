package handlers

import "net/http"

// RegisterRoutes registers all generated API routes
func RegisterRoutes(mux *http.ServeMux) {
	mux.HandleFunc("PUT /api/user/profile", UpdateUserProfile)
	mux.HandleFunc("GET /api/user/history", GetUserHistory)
}
