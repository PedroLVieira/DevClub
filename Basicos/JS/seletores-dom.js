/**
 * Seletores do DOM (Document Object Model)
 * ------------------------------------------------------------
 * Este arquivo explica e demonstra os principais métodos para
 * selecionar elementos HTML usando JavaScript, conforme a lista:
 *
 * - getElementById
 * - getElementsByClassName
 * - getElementsByTagName
 * - getElementsByName
 * - querySelector
 * - querySelectorAll
 *
 * Observação:
 * - Todos esses seletores procuram elementos no DOM.
 * - Normalmente você usa `document` para buscar no documento inteiro,
 *   ou um elemento específico (ex.: `container.querySelector(...)`)
 *   para buscar apenas dentro dele.
 */

/* =====================================================================
   1) document.getElementById(id)
   =====================================================================

   O que faz?
   - Retorna UM único elemento que possua o atributo `id` igual ao valor
     informado.

   Assinatura:
   - document.getElementById(id: string): HTMLElement | null

   Retorno:
   - Um elemento (por exemplo, HTMLDivElement, HTMLInputElement, etc.)
   - ou `null` se não encontrar.

   Regras e dicas:
   - `id` deve ser único na página (boa prática e esperado pelo HTML).
   - É um seletor rápido e muito comum.

   Exemplo HTML:
   <button id="btnSalvar">Salvar</button>

   Exemplo JS:
   const btn = document.getElementById('btnSalvar');
   if (btn) {
     btn.addEventListener('click', () => {
       console.log('Cliquei em salvar');
     });
   }
*/

/**
 * Exemplo (comentado) de uso do getElementById.
 */
// const btnSalvar = document.getElementById('btnSalvar');
// console.log(btnSalvar); // HTMLElement ou null


/* =====================================================================
   2) document.getElementsByClassName(className)
   =====================================================================

   O que faz?
   - Retorna uma COLEÇÃO de elementos que tenham a classe informada.

   Assinatura:
   - document.getElementsByClassName(className: string): HTMLCollectionOf<Element>

   Retorno:
   - `HTMLCollection` (coleção) — parece um array, mas NÃO é um array.

   Importante (LIVE COLLECTION):
   - A HTMLCollection é "ao vivo" (live). Se elementos com essa classe
     forem adicionados/removidos do DOM, a coleção é atualizada automaticamente.

   Dicas:
   - Para iterar, você pode usar um `for` tradicional.
   - Para usar métodos de array (`map`, `filter`, etc.), converta para array:
     `Array.from(colecao)` ou `[...colecao]`.

   Exemplo HTML:
   <li class="item">A</li>
   <li class="item">B</li>

   Exemplo JS:
   const itens = document.getElementsByClassName('item');
   for (const el of itens) {
     el.classList.add('ativo');
   }
*/

/**
 * Exemplo (comentado) de uso do getElementsByClassName.
 */
// const itens = document.getElementsByClassName('item');
// console.log(itens); // HTMLCollection
// const itensArray = Array.from(itens);
// console.log(itensArray.map((el) => el.textContent));


/* =====================================================================
   3) document.getElementsByTagName(tagName)
   =====================================================================

   O que faz?
   - Retorna uma COLEÇÃO (HTMLCollection) de todos os elementos com a tag
     informada.

   Assinatura:
   - document.getElementsByTagName(tagName: string): HTMLCollectionOf<Element>

   Retorno:
   - `HTMLCollection` (live).

   Dicas:
   - Você pode buscar por tags como 'div', 'a', 'p', 'li', etc.
   - Também funciona com '*', que seleciona todas as tags (use com cuidado).

   Exemplo JS:
   const links = document.getElementsByTagName('a');
   for (const a of links) {
     a.setAttribute('target', '_blank');
   }
*/

/**
 * Exemplo (comentado) de uso do getElementsByTagName.
 */
// const paragrafos = document.getElementsByTagName('p');
// console.log(paragrafos.length);


/* =====================================================================
   4) document.getElementsByName(name)
   =====================================================================

   O que faz?
   - Retorna uma NodeList de elementos que possuam o atributo `name`
     com o valor informado.

   Assinatura (na prática):
   - document.getElementsByName(name: string): NodeListOf<HTMLElement>

   Retorno:
   - `NodeList` (geralmente estática, não é "live" como HTMLCollection).

   Onde é muito usado?
   - Em formulários (inputs, radios, checkboxes) que compartilham o mesmo `name`.

   Exemplo HTML:
   <input type="radio" name="cor" value="vermelho" />
   <input type="radio" name="cor" value="azul" />

   Exemplo JS:
   const radios = document.getElementsByName('cor');
   radios.forEach((radio) => {
     // Em alguns casos, pode ser necessário checar se é um input:
     // if (radio instanceof HTMLInputElement) { ... }
     radio.addEventListener('change', (e) => {
       const alvo = e.target;
       console.log('Mudou para:', alvo.value);
     });
   });
*/

/**
 * Exemplo (comentado) de uso do getElementsByName.
 */
// const campos = document.getElementsByName('email');
// console.log(campos); // NodeList


/* =====================================================================
   5) document.querySelector(selector)
   =====================================================================

   O que faz?
   - Retorna o PRIMEIRO elemento que corresponda ao seletor CSS informado.

   Assinatura:
   - document.querySelector(selector: string): Element | null

   Retorno:
   - Um elemento (ou `null`).

   Por que é tão usado?
   - Porque aceita QUALQUER seletor CSS:
     - '#id'
     - '.classe'
     - 'tag'
     - '[atributo]'
     - combinadores: 'header nav a', '.card .titulo', etc.

   Dica importante:
   - Se você quer pegar vários elementos, use `querySelectorAll`.

   Exemplos:
   const btn = document.querySelector('#btnSalvar');
   const primeiroItem = document.querySelector('.item');
   const inputEmail = document.querySelector('input[name="email"]');
*/

/**
 * Exemplo (comentado) de uso do querySelector.
 */
// const titulo = document.querySelector('h1');
// if (titulo) {
//   titulo.textContent = 'Título alterado via JS';
// }


/* =====================================================================
   6) document.querySelectorAll(selector)
   =====================================================================

   O que faz?
   - Retorna TODOS os elementos que correspondam ao seletor CSS informado.

   Assinatura:
   - document.querySelectorAll(selector: string): NodeListOf<Element>

   Retorno:
   - `NodeList` (estática) — não atualiza automaticamente quando o DOM muda.

   Vantagens:
   - Aceita seletores CSS avançados.
   - `NodeList` normalmente tem `.forEach()`, o que facilita iterar.

   Exemplo:
   const cards = document.querySelectorAll('.card');
   cards.forEach((card) => {
     card.classList.add('destacar');
   });
*/

/**
 * Exemplo (comentado) de uso do querySelectorAll.
 */
// const botoes = document.querySelectorAll('button');
// botoes.forEach((btn) => btn.addEventListener('click', () => console.log('Clique!')));


/* =====================================================================
   Comparação rápida (resumo)
   =====================================================================

   - getElementById('id')
     Retorna: 1 elemento ou null
     Seleção: por id

   - getElementsByClassName('classe')
     Retorna: HTMLCollection (live)
     Seleção: por classe

   - getElementsByTagName('tag')
     Retorna: HTMLCollection (live)
     Seleção: por tag

   - getElementsByName('name')
     Retorna: NodeList (geralmente estática)
     Seleção: por atributo name

   - querySelector('seletor CSS')
     Retorna: 1 elemento ou null
     Seleção: seletor CSS (flexível)

   - querySelectorAll('seletor CSS')
     Retorna: NodeList (estática)
     Seleção: seletor CSS (flexível)
*/


/* =====================================================================
   Boas práticas e erros comuns
   =====================================================================

   1) Sempre trate o caso de `null` quando o seletor pode não existir.
      Exemplo:
        const el = document.querySelector('.nao-existe');
        if (!el) return;

   2) Diferença entre HTMLCollection e NodeList
      - HTMLCollection (live): se o DOM muda, a coleção muda.
      - NodeList (static): é um "snapshot" do momento em que você selecionou.

   3) Não confunda:
      - getElementById (singular)
      - getElementsByClassName / TagName / Name (plural)

   4) Converter para Array quando necessário:
      const colecao = document.getElementsByClassName('item');
      const array = [...colecao];
      array.filter(...).map(...)

   5) Prefira `querySelector`/`querySelectorAll` quando precisar de:
      - seletores complexos
      - selecionar por atributo (ex.: input[name="email"])
      - combinar seletores (ex.: '.menu a.ativo')
*/


/* =====================================================================
   Mini-exercício (opcional)
   =====================================================================

   1) Crie no HTML:
      <ul>
        <li class="item">Item 1</li>
        <li class="item">Item 2</li>
      </ul>

   2) Depois, no JS:
      const itens = document.querySelectorAll('.item');
      itens.forEach((el, i) => {
        el.textContent = `Item ${i + 1} (alterado)`;
      });
*/
