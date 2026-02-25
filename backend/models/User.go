package models

import (
	"time"
	"gorm.io/gorm"
)

type User struct {
	ID        int64          `gorm:"primaryKey;autoIncrement" json:"id"`
	CreatedAt time.Time      `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt time.Time      `gorm:"autoUpdateTime" json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
	Name      string         `gorm:"type:varchar(100);not null" json:"name"`
	Email     string         `gorm:"type:varchar(255);unique;not null;index" json:"email"`
	Password  string         `gorm:"type:varchar(255);not null" json:"-"`
	Histories []History      `gorm:"foreignKey:UserID" json:"histories,omitempty"`
}

func (User) TableName() string {
	return "users"
}
