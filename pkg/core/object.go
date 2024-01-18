package core

type NotifyObject struct {
	data map[string]any

	OnChange func(map[string]any, string, any)
}

func NewNotifyObject(onChange func(map[string]any, string, any)) *NotifyObject {
	return &NotifyObject{
		data:     make(map[string]any),
		OnChange: onChange,
	}
}

func (no *NotifyObject) Init(initData map[string]any) {
	no.data = initData
}

func (no *NotifyObject) Set(k string, v any) {
	if v == nil {
		delete(no.data, k)
	} else {
		no.data[k] = v
	}
	if no.OnChange != nil {
		no.OnChange(no.data, k, v)
	}
}

func (no *NotifyObject) Get(k string) any {
	return no.data[k]
}
