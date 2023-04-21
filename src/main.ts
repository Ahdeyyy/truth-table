import { NewLexer } from "./lexer";
import "./style.css";

import Alpine from "alpinejs";
import { EOF, Token } from "./token";

window.Evaluate = function () {
  let input: string = document.querySelector("input")?.value || "";
  let token_block = document.getElementById("token-block");
  if (input === "") {
    if (token_block) {
      token_block.innerHTML = `
      <h3 class="font-sans text-xl text-center mb-5 uppercase font-semibold" >Tokens</h3>
      `;
      return;
    }
  }
  let l = NewLexer(input);
  let result = "\n";
  let tokens: Token[] = [];

  for (let tok = l.nextToken(); tok.Type != EOF; tok = l.nextToken()) {
    result += JSON.stringify(tok) + "\n";
    tokens.push(tok);
  }
  let code_block = document.querySelector("code");
  if (code_block) {
    code_block.innerText = result;
  }
  Alpine.data("tokens", () => ({
    tokens: tokens,
  }));
  if (token_block) {
    token_block.innerHTML = `
    <h3 class="font-sans text-xl text-center mb-5 uppercase font-semibold" >Tokens</h3>
    <ul class="bg-slate-900/20 p-5 rounded-lg " x-data="tokens">
        <template x-for="token in tokens">
          <li class="mb-2 font-mono" x-data="{open: true}" >
            <p>
              <span @click="open = !open" class="text-blue-400 cursor-pointer select-none" >{</span>
                  
                <template x-if="open" >
                  <div>
                    <p>
                      <span class="text-orange-500 ml-3" >Type:</span> <span class="text-green-500" x-text="token.Type"></span>
                    </p>
                    <p>
                      <span class="text-orange-500 ml-3" >Literal:</span> <span class="text-green-500" x-text="token.Literal"></span>
                    </p>
                  </div>
                </template>
                <template x-if="!open">
                  <span> ... </span>
                </template>
              <span class="text-blue-400" >}</span>
            </p>
          </li>
        </template>
      </ul>`;
  }
};

window.Alpine = Alpine;
Alpine.start();
