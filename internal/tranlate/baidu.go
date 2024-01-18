package tranlate

import (
	"net/http"
)

type BaiduTranslator struct {
	c *http.Client
}

func NewBaiduTranslator() *BaiduTranslator {
	return &BaiduTranslator{
		c: http.DefaultClient,
	}
}
func (b *BaiduTranslator) Translate(p *TranslateParams) string {
	//path := fmt.Sprintf("https://fanyi.baidu.com/v2transapi?from=%s&to=%s&query=%s", p.From, p.To, p.Text)
	return ""
}
