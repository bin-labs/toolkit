import { useTranslation } from "react-i18next";
import { TRANSLATOR_NAME } from "@/modules/ai/translator/tool";
import { MODULE_NAME } from "@/modules/ai/consts";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useGlobalDialog } from "@/components/dialog";
import { Loader2, SettingsIcon } from "lucide-react";
import translator, {
  Language,
  TranslateError,
} from "@/modules/ai/translator/providers";
import { useLocalState } from "@/hooks/state";
import { Combobox } from "@/components/comobox/Combobox";

export function TranslatePage() {
  const [text, setText] = useLocalState(TRANSLATOR_NAME + ".text", "");
  const [resText, setResText] = useState<string>("");
  const [providers, setProviders] = useState(translator.getProviders());
  const items = providers.map((p) => ({ label: p.label, value: p.name }));
  const [provider, setProvider] = useLocalState(
    TRANSLATOR_NAME + ".provider",
    items[0]?.value ?? ""
  );
  const [toLangs, setToLangs] = useState<Language[]>([]);
  const [fromLangs, setFromLangs] = useState<Language[]>([]);
  const [from, setFrom] = useLocalState(
    TRANSLATOR_NAME + ".provider.from." + provider,
    ""
  );
  const [to, setTo] = useLocalState(
    TRANSLATOR_NAME + ".provider.to." + provider,
    ""
  );
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation(MODULE_NAME);
  const { show, showError } = useGlobalDialog();

  const handleTranslate = async () => {
    setLoading(true);
    try {
      const res = await translator.translate(provider, {
        text: text,
        from: from,
        to: to,
        callback: (text) => {
          setResText(text);
        },
      });
      setResText(res);
    } catch (e: any) {
      console.error(e);
      if (e instanceof TranslateError) {
        if (e.code === "SettingsError") {
          handleSettings();
        } else {
          showError({
            title: t("Error"),
            content: e.message,
          });
        }
      } else {
        showError({
          title: t("Error"),
          content: e.message,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSettings = () => {
    const p = providers.find((p) => p.name === provider);
    if (p && p.settingOptions) {
      show({
        ...p.settingOptions,
        title: "Settings: " + (p.label ?? ""),
      });
    }
  };

  useEffect(() => {
    if (provider) {
      translator.getLanguages(provider).then((res) => {
        setToLangs(res.toLang);
        setFromLangs(res.fromLang);

        // TODO: 简化代码，与useState合并，抽取成新的hook
        let deTo: string | null | undefined = localStorage.getItem(
          TRANSLATOR_NAME + ".provider.to." + provider
        );
        if (deTo === null || deTo === "") {
          deTo = res.toLang.find((l) => l.value === res.defaultTo)?.value;
        }
        setTo(deTo ?? "");

        let deFrom: string | null | undefined = localStorage.getItem(
          TRANSLATOR_NAME + ".provider.from." + provider
        );
        if (deFrom === null || deFrom === "") {
          deFrom = res.fromLang?.find(
            (l) => l.value === res.defaultFrom
          )?.value;
        }
        setFrom(deFrom ?? "");
      });
    } else {
      setToLangs([]);
    }
  }, [provider]);

  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="text-xl">{t(TRANSLATOR_NAME)}</div>
      <div className="flex flex-wrap gap-2 items-center">
        <span className="flex-1">{t("Input text")}:</span>
        {t("Model")}:
        <Combobox
          width="unset"
          items={items}
          value={provider}
          disableSearch
          onChange={(m) => {
            setProvider(m);
          }}
        />
        <Button variant="secondary" onClick={handleSettings}>
          <SettingsIcon className="mr-1 h-4 w-4" />
          {t("Setting")}
        </Button>
      </div>
      <Textarea
        rows={8}
        defaultValue={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex items-center gap-2">
        {t("From")}:
        <Combobox
          width="160px"
          items={fromLangs}
          value={from}
          onChange={(m) => {
            setFrom(m);
          }}
        />
        {t("To")}:
        <Combobox
          width="160px"
          items={toLangs}
          value={to}
          onChange={(m) => {
            setTo(m);
          }}
        />
        <div className="flex-1"></div>
        <Button
          className="w-[140px]"
          variant="secondary"
          disabled={!text || loading || !to || !provider}
          onClick={handleTranslate}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {t("translate")}
        </Button>
      </div>
      <div className="pt-4">{t("Result")}:</div>
      <Textarea
        defaultValue={resText}
        rows={10}
        readOnly={true}
        className="flex-[1] border-2 p-2 rounded-sm"
      ></Textarea>
    </div>
  );
}
