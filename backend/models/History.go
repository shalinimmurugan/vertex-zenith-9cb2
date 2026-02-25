package models

import (
	"time"
	"gorm.io/gorm"
)

type History struct {
	ID        int64          `gorm:"primaryKey;autoIncrement" json:"id"`
	CreatedAt time.Time      `gorm:"autoCreateTime;index" json:"created_at"`
	UpdatedAt time.Time      `gorm:"autoUpdateTime" json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
	Query     string         `gorm:"type:text;not null" json:"query"`
	Response  string         `gorm:"type:text;not null" json:"response"`
	Type      string         `gorm:"type:varchar(50);not null" json:"type"`
	UserID    int64          `gorm:"not null;index" json:"user_id"`
	User      User           `gorm:"foreignKey:UserID" json:"user,omitempty"`
}

func (History) TableName() string {
	return "histories"
}
