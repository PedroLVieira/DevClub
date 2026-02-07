const convertButton = document.querySelector(".convert-button");
const fromCurrencySelect = document.querySelector(".from-currency");
const toCurrencySelect = document.querySelector(".to-currency") || document.querySelector(".type-currency");
const inputCurrency = document.querySelector(".input-currency");

const currencyValueConverted = document.querySelector(".currency-value");
const currencyValueToConvert = document.querySelector(".currency-value-to-convert");

const fromCurrencyName = document.querySelector(".currency-name-to-convert");
const fromCurrencyImg = document.querySelector(".currency-img-to-convert");

const toCurrencyName = document.querySelector(".currency-name");
const toCurrencyImg = document.querySelector(".currency-img");

const rateUsdEl = document.querySelector("#rate-usd");
const rateEurEl = document.querySelector("#rate-eur");
const rateGbpEl = document.querySelector("#rate-gbp");
const rateBtcEl = document.querySelector("#rate-btc");
const rateUpdatedEl = document.querySelector("#rate-updated");
const rateStatusEl = document.querySelector("#rate-status");

let exchangeRates = {
  USDBRL: 5.25,
  EURBRL: 6.1,
  GBPBRL: 6.6,
  BTCBRL: 250000,
  updatedAt: null,
  source: "fallback",
};

let exchangeRatesRequest = null;

function formatBrl(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function formatBTC(value) {
  return `₿ ${value.toFixed(8)}`;
}

const currencyMeta = {
  real: {
    name: "Real",
    img: "./assets/real.png",
    kind: "fiat",
    locale: "pt-BR",
    code: "BRL",
  },
  dolar: {
    name: "Dólar",
    img: "./assets/dolar.png",
    kind: "fiat",
    locale: "en-US",
    code: "USD",
  },
  euro: {
    name: "Euro",
    img: "./assets/euro.png",
    kind: "fiat",
    locale: "de-DE",
    code: "EUR",
  },
  libra: {
    name: "Libra",
    img: "./assets/libra.png",
    kind: "fiat",
    locale: "en-GB",
    code: "GBP",
  },
  bitcoin: {
    name: "Bitcoin",
    img: "./assets/bitcoin.png",
    kind: "btc",
  },
};

function formatCurrencyValue(currencyId, value) {
  if (currencyId === "bitcoin") return formatBTC(value);

  const meta = currencyMeta[currencyId];
  if (!meta) return String(value);

  return new Intl.NumberFormat(meta.locale, {
    style: "currency",
    currency: meta.code,
  }).format(value);
}

function getRateToBRL(currencyId) {
  if (currencyId === "real") return 1;
  if (currencyId === "dolar") return exchangeRates.USDBRL;
  if (currencyId === "euro") return exchangeRates.EURBRL;
  if (currencyId === "libra") return exchangeRates.GBPBRL;
  if (currencyId === "bitcoin") return exchangeRates.BTCBRL;
  return 1;
}

function updateRatesUI() {
  if (rateUsdEl) rateUsdEl.textContent = formatBrl(exchangeRates.USDBRL);
  if (rateEurEl) rateEurEl.textContent = formatBrl(exchangeRates.EURBRL);
  if (rateGbpEl) rateGbpEl.textContent = formatBrl(exchangeRates.GBPBRL);
  if (rateBtcEl) rateBtcEl.textContent = formatBrl(exchangeRates.BTCBRL);

  if (rateUpdatedEl) {
    rateUpdatedEl.textContent = exchangeRates.updatedAt
      ? exchangeRates.updatedAt.toLocaleString("pt-BR")
      : "--";
  }

  if (rateStatusEl) {
    rateStatusEl.textContent = exchangeRates.source === "api"
      ? "Fonte: AwesomeAPI"
      : "Offline/erro na API: usando valores padrão";
  }
}

async function fetchExchangeRates() {
  // AwesomeAPI: https://docs.awesomeapi.com.br/api-de-moedas
  const url = "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL,BTC-BRL";

  if (exchangeRatesRequest) return exchangeRatesRequest;

  exchangeRatesRequest = (async () => {
    try {
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      const usd = Number(data?.USDBRL?.bid);
      const eur = Number(data?.EURBRL?.bid);
      const gbp = Number(data?.GBPBRL?.bid);
      const btc = Number(data?.BTCBRL?.bid);

      if (!Number.isFinite(usd) || !Number.isFinite(eur) || !Number.isFinite(gbp) || !Number.isFinite(btc)) {
        throw new Error("Resposta inválida da API de câmbio");
      }

      exchangeRates = {
        USDBRL: usd,
        EURBRL: eur,
        GBPBRL: gbp,
        BTCBRL: btc,
        updatedAt: new Date(),
        source: "api",
      };

      updateRatesUI();
      return exchangeRates;
    } catch (error) {
      console.warn("Falha ao buscar cotações; usando fallback.", error);
      exchangeRates = {
        ...exchangeRates,
        source: "fallback",
      };
      updateRatesUI();
      return exchangeRates;
    } finally {
      exchangeRatesRequest = null;
    }
  })();

  return exchangeRatesRequest;
}

function parseCurrencyToNumber(rawValue) {
  if (!rawValue) return 0;

  const numericValue = Number(
    rawValue
      .replace(/\./g, "")
      .replace(",", ".")
      .replace(/[^0-9.\-]/g, "")
  );

  return Number.isNaN(numericValue) ? 0 : numericValue;
}

function updateCurrencyUI() {
  const fromId = fromCurrencySelect?.value || "real";
  const toId = toCurrencySelect?.value || "dolar";

  const fromMeta = currencyMeta[fromId];
  const toMeta = currencyMeta[toId];

  if (fromMeta && fromCurrencyName) fromCurrencyName.textContent = fromMeta.name;
  if (fromMeta && fromCurrencyImg) fromCurrencyImg.src = fromMeta.img;

  if (toMeta && toCurrencyName) toCurrencyName.textContent = toMeta.name;
  if (toMeta && toCurrencyImg) toCurrencyImg.src = toMeta.img;
}

function renderConversion() {
  if (!inputCurrency || !fromCurrencySelect || !toCurrencySelect || !currencyValueConverted || !currencyValueToConvert) return;

  const fromId = fromCurrencySelect.value;
  const toId = toCurrencySelect.value;
  const inputValue = parseCurrencyToNumber(inputCurrency.value);

  const rateFrom = getRateToBRL(fromId);
  const rateTo = getRateToBRL(toId);

  const valueInBRL = inputValue * rateFrom;
  const convertedValue = rateTo === 0 ? 0 : valueInBRL / rateTo;

  currencyValueToConvert.innerHTML = formatCurrencyValue(fromId, inputValue);
  currencyValueConverted.innerHTML = formatCurrencyValue(toId, convertedValue);
}

async function convertValues() {
  if (!inputCurrency || !fromCurrencySelect || !toCurrencySelect || !currencyValueConverted || !currencyValueToConvert) {
    console.error("Elementos do DOM não encontrados. Verifique classes no HTML.");
    return;
  }

  updateCurrencyUI();

  // Atualiza as cotações (com cache/fallback)
  await fetchExchangeRates();

  renderConversion();
}

if (convertButton) {
  convertButton.addEventListener("click", convertValues);
}

if (fromCurrencySelect) fromCurrencySelect.addEventListener("change", convertValues);
if (toCurrencySelect) toCurrencySelect.addEventListener("change", convertValues);

updateCurrencyUI();

// Busca as cotações ao carregar a página (não bloqueia a UI)
updateRatesUI();
fetchExchangeRates();

// Atualiza as cotações periodicamente ("tempo real")
setInterval(async () => {
  await fetchExchangeRates();
  updateCurrencyUI();
  renderConversion();
}, 15000);
