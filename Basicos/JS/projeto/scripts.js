const convertButton = document.querySelector(".convert-button");
const currencySelect = document.querySelector(".type-currency");
const inputCurrency = document.querySelector(".input-currency");

const currencyValueConverted = document.querySelector(".currency-value");
const currencyValueToConvert = document.querySelector(".currency-value-to-convert");

const currencyName = document.querySelector(".currency-name");
const currencyImg = document.querySelector(".currency-img");

const rateUsdEl = document.querySelector("#rate-usd");
const rateEurEl = document.querySelector("#rate-eur");
const rateUpdatedEl = document.querySelector("#rate-updated");
const rateStatusEl = document.querySelector("#rate-status");

let exchangeRates = {
  USDBRL: 5.25,
  EURBRL: 6.1,
  updatedAt: null,
  source: "fallback",
};

function formatBrl(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function updateRatesUI() {
  if (rateUsdEl) rateUsdEl.textContent = formatBrl(exchangeRates.USDBRL);
  if (rateEurEl) rateEurEl.textContent = formatBrl(exchangeRates.EURBRL);

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
  const url = "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL";

  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    const usd = Number(data?.USDBRL?.bid);
    const eur = Number(data?.EURBRL?.bid);

    if (!Number.isFinite(usd) || !Number.isFinite(eur)) {
      throw new Error("Resposta inválida da API de câmbio");
    }

    exchangeRates = {
      USDBRL: usd,
      EURBRL: eur,
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
  }
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
  if (!currencySelect || !currencyName || !currencyImg) return;

  if (currencySelect.value === "dolar") {
    currencyName.textContent = "Dólar";
    currencyImg.src = "./assets/dolar.png";
  }

  if (currencySelect.value === "euro") {
    currencyName.textContent = "Euro";
    currencyImg.src = "./assets/euro.png";
  }
}

async function convertValues() {
  if (!inputCurrency || !currencySelect || !currencyValueConverted || !currencyValueToConvert) {
    console.error("Elementos do DOM não encontrados. Verifique classes no HTML.");
    return;
  }

  updateCurrencyUI();

  // Atualiza as cotações (com cache/fallback)
  await fetchExchangeRates();

  const inputCurrencyValue = parseCurrencyToNumber(inputCurrency.value);
  const dolarToday = exchangeRates.USDBRL;
  const euroToday = exchangeRates.EURBRL;

  if (currencySelect.value === "dolar") {
    currencyValueConverted.innerHTML = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(inputCurrencyValue / dolarToday);
  }

  if (currencySelect.value === "euro") {
    currencyValueConverted.innerHTML = new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(inputCurrencyValue / euroToday);
  }

  currencyValueToConvert.innerHTML = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(inputCurrencyValue);
}

if (convertButton) {
  convertButton.addEventListener("click", convertValues);
}

if (currencySelect) {
  currencySelect.addEventListener("change", convertValues);
}

updateCurrencyUI();

// Busca as cotações ao carregar a página (não bloqueia a UI)
updateRatesUI();
fetchExchangeRates();
