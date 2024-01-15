package settings

type Tool struct {
	Name string `json:"name"`
}

type ToolGroup struct {
	Name  string `json:"name"`
	Tools []Tool `json:"tools"`
}
