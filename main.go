package main

import (
	"embed"
	"github.com/byte-room/toolkit/internal/settings"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := NewApp()

	// Create application with options
	err := wails.Run(&options.App{
		Title:  "ToolKit",
		Width:  1024,
		Height: 768,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		EnableDefaultContextMenu: false,
		BackgroundColour:         &options.RGBA{R: 29, G: 29, B: 31, A: 0},
		OnStartup:                app.startup,
		Bind: []interface{}{
			app,
			settings.Default,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
