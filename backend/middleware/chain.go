package middleware

import "net/http"

func Chain(handler http.Handler) http.Handler {
	handler = LoggingMiddleware(handler)
	handler = ErrorHandlingMiddleware(handler)
	handler = CORSMiddleware(handler)
	return handler
}
