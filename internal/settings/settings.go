package settings

import (
	"encoding/json"
	"github.com/byte-room/toolkit/pkg/core"
	"github.com/labstack/gommon/log"
	"os"
	"os/user"
	"path"
	"sync"
)

const AppName = "toolkit"
const FileName = "settings.json"

type Settings struct {
	obj   *core.NotifyObject
	mutex sync.RWMutex
}

func NewSettings() *Settings {
	st := &Settings{
		obj: core.NewNotifyObject(onSave),
	}
	st.initData()
	return st
}

func onSave(data map[string]any, k string, v any) {
	content, err := json.Marshal(data)
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

func (s *Settings) SetUerData(k string, v any) {
	s.mutex.Lock()
	defer s.mutex.Unlock()
	s.obj.Set(k, v)
}

func (s *Settings) GetUserData(k string) any {
	s.mutex.RLock()
	defer s.mutex.RUnlock()
	return s.obj.Get(k)
}

func (s *Settings) initData() {
	data := map[string]any{}
	content, err := os.ReadFile(path.Join(GetUserDir(), FileName))
	if err != nil {
		log.Errorf("ReadFile error: %s", err.Error())
		return
	}
	err = json.Unmarshal(content, &data)
	if err != nil {
		log.Errorf("json Unmarshal tools error error: %s", err.Error())
		return
	}
	s.obj.Init(data)
	return
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

var Default = NewSettings()
