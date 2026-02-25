package utils

import "strings"

func IsValidEmail(email string) bool {
	return strings.Contains(email, "@") && strings.Contains(email, ".")
}

func SanitizeString(s string) string {
	return strings.TrimSpace(s)
}
