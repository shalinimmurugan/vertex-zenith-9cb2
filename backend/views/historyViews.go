package views

type HistoryItem struct {
	ID        int64  `json:"id"`
	Query     string `json:"query"`
	Response  string `json:"response"`
	Type      string `json:"type"`
	CreatedAt string `json:"created_at"`
}

type HistoryResponse struct {
	Items []HistoryItem `json:"items"`
}
