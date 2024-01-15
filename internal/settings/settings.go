package settings

import (
	"encoding/json"
	"github.com/labstack/gommon/log"
	"os"
	"os/user"
	"path"
)

const AppName = "web3kit"
const FileName = "settings.json"

type Settings struct {
}

func (s *Settings) Tools() []ToolGroup {
	var tools []ToolGroup
	content, err := os.ReadFile(path.Join(GetUserDir(), FileName))
	if err != nil {
		log.Errorf("ReadFile error: %s", err.Error())
		return tools
	}
	err = json.Unmarshal(content, &tools)
	if err != nil {
		log.Errorf("json Unmarshal tools error error: %s", err.Error())
		return tools
	}
	return tools
}

func (s *Settings) SaveTools(tools []ToolGroup) {
	content, err := json.Marshal(tools)
	if err != nil {
		log.Errorf("json Marshal tools error: %s", err.Error())
		return
	}
	err = os.WriteFile(path.Join(GetUserDir(), FileName), content, os.ModePerm)
	if err != nil {
		log.Errorf("WriteFile error: %s", err.Error())
		return
	}
}

func GetUserDir() string {
	uc, err := user.Current()
	if err != nil {
		log.Errorf("GetUserDir error: %s", err.Error())
		return "./"
	}
	userDir := path.Join(uc.HomeDir, "."+AppName)
	err = os.MkdirAll(userDir, os.ModePerm)
	if err != nil {
		log.Errorf("MkdirAll error: %s", err.Error())
		return "./"
	}
	return userDir
}

var Default = &Settings{}
