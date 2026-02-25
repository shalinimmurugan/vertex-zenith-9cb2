package views

type ImageRequest struct {
	Description string `json:"description"`
	Type        string `json:"type"`
}

type ImageResponse struct {
	ImageURL string `json:"image_url"`
	AltText  string `json:"alt_text"`
}
