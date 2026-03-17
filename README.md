# NEU — Núcleo de Estudos da Ucrânia
## Site com Hugo + Netlify CMS

---

### O QUE É ESTE SITE

Site estático gerado pelo **Hugo** — o gerador mais rápido do mercado.
Cada publicação adicionada no painel `/admin` vira HTML puro, indexado pelo Google imediatamente.

**Performance**: HTML servido direto do CDN, sem banco de dados, sem PHP.
**SEO**: Cada publicação, evento e pesquisador tem página própria com meta tags completas.
**Admin**: Interface visual em `/admin` para editar tudo sem tocar em código.

---

### PASSO 1 — Subir no GitHub

1. Entre em **github.com** com sua conta
2. Clique em **New repository** → nome: `neu-site` → **Public** → **Create**
3. Na próxima tela, clique em **uploading an existing file**
4. Arraste **toda esta pasta** (incluindo subpastas) para a tela
5. Clique em **Commit changes**

---

### PASSO 2 — Conectar ao Netlify e publicar

1. Acesse **netlify.com** → faça login com GitHub
2. **Add new site → Import an existing project → GitHub**
3. Selecione o repositório `neu-site`
4. Configure o build:
   - **Build command**: `hugo --minify`
   - **Publish directory**: `public`
   - **Environment variable**: `HUGO_VERSION = 0.121.0`
5. Clique em **Deploy site**
6. Em ~2 minutos o site está no ar

---

### PASSO 3 — Ativar o painel de administração

1. No Netlify → **Site configuration → Identity → Enable Identity**
2. Em **Registration** → selecione **Invite only**
3. Em **Services → Git Gateway → Enable Git Gateway**
4. Em **Identity → Invite users** → convide seu email
5. Siga o link que chegou no email para criar sua senha
6. Acesse `seusite.netlify.app/admin` → pronto!

---

### PASSO 4 — Como usar o admin

Em `seusite.netlify.app/admin` você pode:

**Publicações** → Adicionar artigos acadêmicos, artigos na mídia e livros.
Campos: título, autores, tipo, veículo/editora, ano, link externo, resumo.
A publicação aparece automaticamente em `/publicacoes/` e na homepage.

**Eventos** → Adicionar eventos futuros e registros de eventos realizados.
Campos: título, data, tipo, local, status (próximo/realizado), link do vídeo.
Eventos com status "próximo" aparecem na seção "Próximos".
Eventos realizados aparecem em "Eventos anteriores".

**Pesquisadores** → Adicionar e editar membros do NEU.
Campos: nome, sigla, instituição, área, Lattes, email, foto, biografia.

---

### PASSO 5 — Domínio próprio

1. Netlify → **Domain management → Add custom domain**
2. Digite o domínio (ex: `neucrania.org`)
3. Siga as instruções de DNS
4. HTTPS gratuito e automático via Let's Encrypt

---

### ESTRUTURA DE ARQUIVOS

```
neu-site/
├── config.toml              ← configurações gerais do site
├── netlify.toml             ← build: hugo --minify
├── content/
│   ├── _index.md            ← homepage
│   ├── publicacoes/         ← artigos e livros (editados pelo admin)
│   ├── eventos/             ← agenda (editada pelo admin)
│   └── membros/             ← pesquisadores (editados pelo admin)
├── layouts/
│   ├── _default/baseof.html ← template base com SEO completo
│   ├── index.html           ← homepage
│   ├── partials/            ← nav, footer, newsletter, divider
│   ├── publicacoes/         ← lista e página individual
│   ├── eventos/             ← lista e página individual
│   └── membros/             ← lista e página individual
├── static/
│   └── assets/
│       ├── css/main.css     ← design system completo
│       ├── js/main.js       ← hamburger + filtros
│       └── img/favicon.svg
└── admin/
    ├── index.html           ← painel de administração
    └── config.yml           ← campos editáveis (publicações, eventos, membros)
```

---

### EDITAR TEXTOS FIXOS

Textos institucionais (missão, descrição, email) estão em `config.toml`.
Abra o arquivo no GitHub e edite diretamente.

Para editar o texto da homepage, edite `content/_index.md`.

---

### DÚVIDAS

- Documentação Hugo: https://gohugo.io/documentation/
- Netlify CMS (Decap): https://decapcms.org/docs/
- Suporte Netlify: https://docs.netlify.com/
