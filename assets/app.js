/* Doc Writer Lab - shared app: site UI (header, home filters) + in-browser PDF/text tools engine. v2 (Nov 2026) */
/*META:start*/
var META = {
  merge:['organize','/merge-pdf/'], split:['organize','/split-pdf/'], remove:['organize','/remove-pdf-pages/'],
  extract:['organize','/extract-pdf-pages/'], organize:['organize','/reorder-pdf-pages/'], rotate:['organize','/rotate-pdf/'],
  compress:['optimize','/compress-pdf/'],
  pdf2jpg:['convert','/pdf-to-jpg/'], jpg2pdf:['convert','/jpg-to-pdf/'], pdf2text:['convert','/pdf-to-text/'],
  number:['edit','/add-page-numbers/'], watermark:['edit','/add-pdf-watermark/'], crop:['edit','/crop-pdf/'], addtext:['edit','/add-text-to-pdf/'],
  sign:['security','/sign-pdf/'], flatten:['security','/flatten-pdf-forms/'],
  words:['text','/word-counter/'], 'case':['text','/case-converter/'],
  charcount:['text','/character-counter/'], sentencecount:['text','/sentence-counter/'], linecount:['text','/line-counter/'],
  cleantext:['text','/text-cleaner/'], dedupe:['text','/remove-duplicate-lines/'], sortlines:['text','/sort-lines/'],
  reverse:['text','/reverse-text/'], findreplace:['text','/find-and-replace-text/'], slug:['text','/url-slug-generator/'], lorem:['text','/lorem-ipsum-generator/'],
  percent:['calc','/percentage-calculator/'], age:['calc','/age-calculator/']
};
var ORDER = ['merge','split','compress','pdf2jpg','jpg2pdf','pdf2text','rotate','remove','extract','organize','number','watermark','crop','addtext','sign','flatten','words','case','charcount','sentencecount','linecount','cleantext','dedupe','sortlines','reverse','findreplace','slug','lorem','percent','age'];
var CATS = [['all','All tools'],['organize','Organize PDF'],['optimize','Optimize PDF'],['convert','Convert PDF'],['edit','Edit PDF'],['security','PDF Security'],['text','Text tools'],['calc','Calculators']];
var ICONS = {
  merge:'<path d="M12 2.5 3 7.5l9 5 9-5-9-5z"/><path d="m3 12 9 5 9-5"/><path d="m3 16.5 9 5 9-5"/>',
  split:'<circle cx="6" cy="6.5" r="2.6"/><circle cx="6" cy="17.5" r="2.6"/><path d="M20 4.5 8.2 15.6"/><path d="M20 19.5 8.2 8.4"/>',
  rotate:'<path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/>',
  remove:'<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><path d="M10 11v6"/><path d="M14 11v6"/>',
  number:'<path d="M4 9h16"/><path d="M4 15h16"/><path d="M10 3 8 21"/><path d="m16 3-2 18"/>',
  pdf2jpg:'<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>',
  jpg2pdf:'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><circle cx="10" cy="12" r="2"/><path d="m20 17-1.3-1.3a2 2 0 0 0-2.8 0L9 22"/>',
  compress:'<path d="M4 14h6v6"/><path d="M20 10h-6V4"/><path d="m14 10 7-7"/><path d="m3 21 7-7"/>',
  extract:'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M8 15h8"/><path d="m13 12 3 3-3 3"/>',
  organize:'<path d="m3 8 4-4 4 4"/><path d="M7 4v16"/><path d="m21 16-4 4-4-4"/><path d="M17 20V4"/>',
  watermark:'<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',
  crop:'<path d="M6 2v14a2 2 0 0 0 2 2h14"/><path d="M18 22V8a2 2 0 0 0-2-2H2"/>',
  pdf2text:'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
  sign:'<path d="M12 20h9"/><path d="M16.4 3.6a2.1 2.1 0 0 1 3 3L7.4 18.6l-3.7 1 1-3.7z"/>',
  addtext:'<path d="M4 7V5h11v2"/><path d="M9.5 5v11"/><path d="M7 16h5"/><path d="M18 13v6"/><path d="M15 16h6"/>',
  flatten:'<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  words:'<path d="M17 6H3"/><path d="M21 12H3"/><path d="M15 18H3"/>',
  'case':'<path d="M12 4v16"/><path d="M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2"/><path d="M9 20h6"/>',
  percent:'<path d="M19 5 5 19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
  age:'<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>'
};
/*META:end*/

(function () {
  var $ = function (id) { return document.getElementById(id); };
  var uid = 0;
  var pdfLibrariesPromise = null;
  function loadScript(src, test) {
    if (test()) return Promise.resolve();
    return new Promise(function (resolve, reject) {
      var script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = function () { test() ? resolve() : reject(new Error('A PDF library failed to initialize.')); };
      script.onerror = function () { reject(new Error('Could not load PDF tools. Check your internet connection and try again.')); };
      document.head.appendChild(script);
    });
  }
  function need() {
    if (window.PDFLib && window.JSZip && window.pdfjsLib) return Promise.resolve();
    if (!pdfLibrariesPromise) {
      pdfLibrariesPromise = loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js', function () { return !!window.PDFLib; })
        .then(function () { return loadScript('https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js', function () { return !!window.JSZip; }); })
        .then(function () { return loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js', function () { return !!window.pdfjsLib; }); })
        .then(function () { window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'; })
        .catch(function (err) { pdfLibrariesPromise = null; throw err; });
    }
    return pdfLibrariesPromise;
  }
  function fmt(n) { return n > 1048576 ? (n / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(n / 1024)) + ' KB'; }
  function num(x) { return String(+x.toFixed(4)); }
  function seq(n, fn) { var p = Promise.resolve(); for (var i = 0; i < n; i++) (function (k) { p = p.then(function () { return fn(k); }); })(i); return p; }
  function mk(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }

  function parseRange(s, n) {
    s = (s || '').trim(); if (!s) return null;
    var set = {};
    s.split(',').forEach(function (part) {
      part = part.trim(); if (!part) return;
      var m = part.match(/^(\d+)\s*-\s*(\d*)$/);
      if (m) {
        var a = +m[1], b = m[2] ? +m[2] : n;
        if (a < 1 || b > n || a > b) throw new Error('"' + part + '" is outside pages 1 to ' + n + '.');
        for (var i = a; i <= b; i++) set[i - 1] = 1;
      } else if (/^\d+$/.test(part)) {
        var p = +part; if (p < 1 || p > n) throw new Error('Page ' + p + ' is outside pages 1 to ' + n + '.');
        set[p - 1] = 1;
      } else throw new Error('Could not read "' + part + '". Use a format like 1-3, 5, 8-10');
    });
    return Object.keys(set).map(Number).sort(function (a, b) { return a - b; });
  }

  /* ---------- workspace UI (drop zone, file cards, sidebar, result screen) ---------- */
  var currentTool = null;
  var SVG_UP = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 16V4"/><path d="m7 9 5-5 5 5"/><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/></svg>';
  var SVG_DL = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v12"/><path d="m7 11 5 5 5-5"/><path d="M4 20h16"/></svg>';
  var SVG_GO = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>';
  var SVG_OK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function warm() { need().catch(function () {}); }

  function tileHTML(id, cls) {
    var m = META[id] || ['organize'], t = byId[id];
    var inner = ICONS[id] ? '<svg viewBox="0 0 24 24" aria-hidden="true">' + ICONS[id] + '</svg>' : esc(t ? t.badge : '');
    return '<span class="tile ' + (cls || '') + ' cat-' + m[0] + '">' + inner + '</span>';
  }

  function wireDrop(el, onFiles) {
    ['dragover', 'dragenter'].forEach(function (ev) {
      el.addEventListener(ev, function (e) {
        var types = e.dataTransfer && e.dataTransfer.types ? Array.prototype.slice.call(e.dataTransfer.types) : [];
        if (types.indexOf('Files') < 0) return;
        e.preventDefault(); el.classList.add('over');
      });
    });
    ['dragleave', 'dragend'].forEach(function (ev) { el.addEventListener(ev, function () { el.classList.remove('over'); }); });
    el.addEventListener('drop', function (e) {
      if (!(e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length)) return;
      e.preventDefault(); el.classList.remove('over');
      onFiles(Array.prototype.slice.call(e.dataTransfer.files));
    });
  }
  function picker(o) {
    var inp = mk('input'); inp.type = 'file'; inp.id = 'in' + (++uid); inp.accept = o.accept; inp.multiple = !!o.multiple; inp.hidden = true;
    inp.addEventListener('change', function (e) {
      var fl = Array.prototype.slice.call(e.target.files); e.target.value = '';
      if (fl.length) o.onFiles(fl);
    });
    return inp;
  }
  function dropArea(inp, o) {
    var d = mk('div', 'drop', '<span class="big-ico">' + SVG_UP + '</span><label class="btn xl" for="' + inp.id + '">' + esc(o.label) + '</label><p>' + esc(o.hint) + '</p>');
    wireDrop(d, o.onFiles);
    d.addEventListener('pointerenter', warm, { once: true });
    d.addEventListener('focusin', warm, { once: true });
    return d;
  }

  /* first-page thumbnails (pdf.js) and image previews, cached per File */
  var thumbCache = typeof WeakMap === 'function' ? new WeakMap() : null;
  var thumbQueue = Promise.resolve();
  function setImg(holder, src) { var img = new Image(); img.alt = ''; img.onload = function () { holder.innerHTML = ''; holder.appendChild(img); }; img.src = src; }
  function thumb(file, holder, badge, onInfo) {
    holder.innerHTML = '<span class="ph">' + esc(badge || 'FILE') + '</span>';
    var hit = thumbCache && thumbCache.get(file);
    if (hit) { setImg(holder, hit.src); if (onInfo && hit.pages) onInfo(hit.pages); return; }
    if (/^image\//.test(file.type) || /\.(jpe?g|png)$/i.test(file.name)) {
      var u = URL.createObjectURL(file); if (thumbCache) thumbCache.set(file, { src: u }); setImg(holder, u); return;
    }
    thumbQueue = thumbQueue.then(function () {
      return need().then(function () { return file.arrayBuffer(); }).then(function (buf) {
        return window.pdfjsLib.getDocument({ data: new Uint8Array(buf) }).promise;
      }).then(function (pdf) {
        return pdf.getPage(1).then(function (pg) {
          var vp = pg.getViewport({ scale: 1 }), sc = Math.min(260 / vp.width, 340 / vp.height), v2 = pg.getViewport({ scale: sc });
          var c = document.createElement('canvas'); c.width = Math.ceil(v2.width); c.height = Math.ceil(v2.height);
          var ctx = c.getContext('2d'); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, c.width, c.height);
          return pg.render({ canvasContext: ctx, viewport: v2 }).promise.then(function () {
            var src = c.toDataURL('image/jpeg', .82), n = pdf.numPages;
            if (thumbCache) thumbCache.set(file, { src: src, pages: n });
            setImg(holder, src); if (onInfo) onInfo(n);
            try { pdf.destroy(); } catch (e) {}
          });
        });
      });
    }).catch(function () { /* keep placeholder */ });
  }

  function restart(body) { body.innerHTML = ''; if (currentTool) currentTool.init(body); }

  function suggest(id) {
    var cat = (META[id] || [])[0], pick = [];
    ORDER.forEach(function (k) { if (k !== id && META[k] && META[k][0] === cat && pick.length < 3) pick.push(k); });
    ['merge', 'compress', 'split', 'pdf2jpg'].forEach(function (k) { if (k !== id && pick.indexOf(k) < 0 && pick.length < 5 && (cat !== 'text' && cat !== 'calc')) pick.push(k); });
    return pick.map(function (k) { return '<a href="' + META[k][1] + '">' + tileHTML(k, 'sm') + esc(byId[k].name) + '</a>'; }).join('');
  }

  function deliver(host, blob, name, note) {
    var url = URL.createObjectURL(blob);
    var selftest = !!window.__PDF_ENGINE_SELFTEST_ACTIVE;
    if (selftest) window.__PDF_ENGINE_SELFTEST_OUTPUT = { blob: blob, name: name };
    host.innerHTML = '';
    var box = mk('div', 'done', '<span class="tick">' + SVG_OK + '</span><h2>Your file is ready!</h2><p class="d-note"></p>');
    box.querySelector('.d-note').textContent = note || (name + '  ·  ' + fmt(blob.size));
    var a = mk('a', 'btn xl dl', SVG_DL + '<span></span>'); a.href = url; a.download = name; a.querySelector('span').textContent = 'Download ' + name;
    var again = mk('button', 'btn alt', 'Start over'); again.type = 'button';
    again.onclick = function () { restart(host); window.scrollTo({ top: 0, behavior: 'smooth' }); };
    var row = mk('div', 'row'); row.style.justifyContent = 'center'; row.appendChild(again);
    box.appendChild(a); box.appendChild(row);
    if (currentTool) { var nx = mk('div', 'next', suggest(currentTool.id)); if (nx.children.length) { box.appendChild(mk('p', 'tag', 'Keep going with')); box.appendChild(nx); } }
    host.appendChild(box);
    if (!selftest) { try { a.click(); } catch (e) {} }
  }
  function isPdf(f) { return /pdf$/i.test(f.type) || /\.pdf$/i.test(f.name); }
  function blobPdf(bytes) { return new Blob([bytes], { type: 'application/pdf' }); }

  /* ---------- multi-file tools (merge, images to PDF) ---------- */
  function multiTool(body, o) {
    var files = [], stage = mk('div'), msg = null, dragFrom = -1;
    var inp = picker({ accept: o.accept, multiple: true, onFiles: add });
    body.appendChild(inp); body.appendChild(stage);
    function say(t, err, busy) { if (!msg) return; msg.className = 'msg' + (err ? ' err' : '') + (busy ? ' busy' : ''); msg.textContent = t; }
    function add(fl) {
      var okFiles = fl.filter(o.ok);
      okFiles.forEach(function (f) { files.push(f); });
      if (okFiles.length) render(); else say('That file type is not supported here. ' + (o.hint || ''), 1);
    }
    function render() {
      stage.innerHTML = '';
      if (!files.length) {
        stage.appendChild(dropArea(inp, { label: o.label, hint: o.dropHint || 'or drop files here', onFiles: add }));
        msg = mk('p', 'msg'); msg.setAttribute('role', 'status'); stage.appendChild(msg);
        return;
      }
      var wrap = mk('div', 'ws-grid'), main = mk('div', 'panel-main'), grid = mk('div', 'fgrid'), side = mk('aside', 'side');
      files.forEach(function (f, i) {
        var card = mk('div', 'fcard', '<div class="thumb"></div><div class="fname"></div><div class="fsize"></div><div class="fctl"><button type="button" aria-label="Remove file" title="Remove">&times;</button></div><div class="fmove"><button type="button" aria-label="Move earlier" title="Move earlier">&larr;</button><button type="button" aria-label="Move later" title="Move later">&rarr;</button></div>');
        card.draggable = true;
        card.querySelector('.fname').textContent = f.name; card.querySelector('.fname').title = f.name;
        var sz = card.querySelector('.fsize'); sz.textContent = fmt(f.size);
        thumb(f, card.querySelector('.thumb'), o.badge, function (n) { sz.textContent = n + (n === 1 ? ' page' : ' pages') + ' · ' + fmt(f.size); });
        var b = card.querySelectorAll('button');
        b[0].onclick = function () { files.splice(i, 1); render(); };
        b[1].disabled = i === 0; b[2].disabled = i === files.length - 1;
        b[1].onclick = function () { files.splice(i - 1, 0, files.splice(i, 1)[0]); render(); };
        b[2].onclick = function () { files.splice(i + 1, 0, files.splice(i, 1)[0]); render(); };
        card.addEventListener('dragstart', function (e) { dragFrom = i; card.classList.add('dragging'); e.dataTransfer.effectAllowed = 'move'; try { e.dataTransfer.setData('text/plain', String(i)); } catch (x) {} });
        card.addEventListener('dragend', function () { dragFrom = -1; card.classList.remove('dragging'); });
        card.addEventListener('dragover', function (e) { if (dragFrom < 0) return; e.preventDefault(); card.classList.add('target'); });
        card.addEventListener('dragleave', function () { card.classList.remove('target'); });
        card.addEventListener('drop', function (e) {
          if (dragFrom < 0) return; e.preventDefault(); e.stopPropagation();
          if (dragFrom !== i) files.splice(i, 0, files.splice(dragFrom, 1)[0]);
          dragFrom = -1; render();
        });
        grid.appendChild(card);
      });
      var more = mk('button', 'addmore', '<b>+</b><span>Add more</span>'); more.type = 'button'; more.onclick = function () { inp.click(); }; grid.appendChild(more);
      main.appendChild(grid); wireDrop(main, add);

      side.innerHTML = '<h2></h2><p class="hint"></p>';
      side.querySelector('h2').textContent = (currentTool ? currentTool.name : 'Your files');
      side.querySelector('.hint').textContent = files.length + (files.length === 1 ? ' file' : ' files') + ' selected. ' + (o.side || 'Drag the cards or use the arrows to change the order.');
      var row = mk('div', 'row action'), go = mk('button', 'btn xl block', '<span></span>' + SVG_GO); go.type = 'button'; go.firstChild.textContent = o.btn;
      msg = mk('p', 'msg'); msg.setAttribute('role', 'status');
      var clr = mk('button', 'linkbtn', 'Remove all files'); clr.type = 'button'; clr.onclick = function () { files = []; render(); };
      row.appendChild(go); row.appendChild(msg); side.appendChild(row); side.appendChild(clr);
      wrap.appendChild(main); wrap.appendChild(side); stage.appendChild(wrap);
      go.disabled = files.length < o.min;
      if (files.length < o.min) say('Add at least ' + o.min + ' files to continue.');
      go.onclick = function () {
        go.disabled = true; say('Working...', 0, 1);
        need().then(function () { return o.run(files); }).then(function (bytes) { deliver(body, blobPdf(bytes), o.out); })
          .catch(function (e) { say('Could not finish: ' + (e && e.message ? e.message : 'unknown error') + '. Check that the files are not password protected.', 1); go.disabled = files.length < o.min; });
      };
    }
    render();
  }

  /* ---------- single-PDF tools ---------- */
  function pdfTool(body, cfg) {
    var bytes = null, pages = 0, file = null, stage = mk('div'), msg = null, opts = null;
    var inp = picker({ accept: 'application/pdf,.pdf', multiple: false, onFiles: onFiles });
    body.appendChild(inp); body.appendChild(stage);
    function say(t, err, busy) { if (!msg) return; msg.className = 'msg' + (err ? ' err' : '') + (busy ? ' busy' : ''); msg.textContent = t; }
    function drop() {
      stage.innerHTML = '';
      stage.appendChild(dropArea(inp, { label: 'Select PDF file', hint: 'or drop a PDF here', onFiles: onFiles }));
      msg = mk('p', 'msg'); msg.setAttribute('role', 'status'); stage.appendChild(msg);
    }
    function onFiles(fl) {
      var f = fl[0]; if (!f) return;
      if (!isPdf(f)) { say('Please choose a PDF file.', 1); return; }
      say('Reading file...', 0, 1);
      need().then(function () { return f.arrayBuffer(); })
        .then(function (buf) { return PDFLib.PDFDocument.load(buf).then(function (d) { return { buf: buf, n: d.getPageCount() }; }); })
        .then(function (r) { bytes = r.buf; pages = r.n; file = f; workspace(); })
        .catch(function () { say('Could not open this PDF. It may be password protected or damaged.', 1); });
    }
    function workspace() {
      stage.innerHTML = '';
      var wrap = mk('div', 'ws-grid'), main = mk('div', 'panel-main'), side = mk('aside', 'side');
      var one = mk('div', 'single', '<div class="thumb"></div><div class="meta"><div class="fname"></div><div class="info"></div></div>');
      one.querySelector('.fname').textContent = file.name;
      one.querySelector('.info').textContent = pages + (pages === 1 ? ' page' : ' pages') + ' · ' + fmt(file.size);
      thumb(file, one.querySelector('.thumb'), 'PDF');
      var change = mk('button', 'linkbtn', 'Choose a different PDF'); change.type = 'button'; change.onclick = function () { inp.click(); };
      one.querySelector('.meta').appendChild(change);
      main.appendChild(one); wireDrop(main, onFiles);
      side.innerHTML = '<h2></h2>';
      side.querySelector('h2').textContent = (currentTool ? currentTool.name : 'Options');
      opts = mk('div', 'opts', cfg.options || '');
      if (cfg.options) side.appendChild(opts); else { side.appendChild(opts); opts.hidden = true; side.appendChild(mk('p', 'hint', 'No settings needed. Press the button when you are ready.')); }
      var row = mk('div', 'row action'), run = mk('button', 'btn xl block', '<span></span>' + SVG_GO); run.type = 'button'; run.firstChild.textContent = cfg.btn;
      msg = mk('p', 'msg'); msg.setAttribute('role', 'status');
      row.appendChild(run); row.appendChild(msg); side.appendChild(row);
      wrap.appendChild(main); wrap.appendChild(side); stage.appendChild(wrap);
      run.onclick = function () {
        run.disabled = true; say('Working...', 0, 1);
        need().then(function () {
          return cfg.run({ bytes: bytes, pages: pages, say: function (t, e) { say(t, e, !e); }, val: function (k) { return opts.querySelector('[data-k="' + k + '"]').value; } });
        }).then(function (r) { deliver(body, r.blob, r.name, r.note); })
          .catch(function (e) { say(e && e.message ? e.message : 'Something went wrong.', 1); run.disabled = false; });
      };
    }
    drop();
  }

  function pageToJpeg(page, scale, q) {
    var vp = page.getViewport({ scale: scale }), c = document.createElement('canvas');
    c.width = Math.ceil(vp.width); c.height = Math.ceil(vp.height);
    var ctx = c.getContext('2d'); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, c.width, c.height);
    return page.render({ canvasContext: ctx, viewport: vp }).promise.then(function () { return new Promise(function (res) { c.toBlob(res, 'image/jpeg', q); }); });
  }
  function needJs() { if (!window.pdfjsLib || !window.JSZip) throw new Error('The PDF viewer engine did not load. Check your internet and reload the page.'); }

  /* ---------- tool definitions ---------- */
  var TOOLS = [
    { id: 'merge', name: 'Merge PDF', badge: 'PDF', c: 'red', desc: 'Join many PDF files into one, in the order you choose.',
      lead: 'Add two or more PDFs, arrange them, then merge. Everything runs inside your browser.',
      how: ['Choose the PDF files you want to join.', 'Use the arrows to put them in the right order.', 'Press Merge PDFs and save the result.'],
      about: 'Merging copies every page from each file into one new PDF, so text stays sharp and images keep their quality. Use it to combine invoices, scanned pages, chapters or forms into a single document that is easy to email.',
      init: function (b) { multiTool(b, { accept: 'application/pdf,.pdf', label: 'Select PDF files', hint: 'Please choose PDF files.', dropHint: 'or drop PDF files here', badge: 'PDF', color: 'var(--pdf)', min: 2, btn: 'Merge PDFs', out: 'merged.pdf', ok: isPdf,
        run: function (files) { return PDFLib.PDFDocument.create().then(function (out) { return seq(files.length, function (i) { return files[i].arrayBuffer().then(function (buf) { return PDFLib.PDFDocument.load(buf); }).then(function (d) { return out.copyPages(d, d.getPageIndices()); }).then(function (pg) { pg.forEach(function (p) { out.addPage(p); }); }); }).then(function () { return out.save(); }); }); } }); } },

    { id: 'split', name: 'Split PDF', badge: 'CUT', c: 'amber', desc: 'Pull out pages or save every page as its own file.',
      lead: 'Extract a page range into a new PDF, or split the whole file into one PDF per page.',
      how: ['Choose a PDF.', 'Pick a mode. For a range, type pages like 1-3, 5.', 'Press Split PDF and save the result.'],
      about: 'Splitting is useful when you only need part of a large document, such as one chapter or a single form. Extract mode makes one new PDF from your chosen pages. Every-page mode gives you a ZIP file with one PDF for each page.',
      init: function (b) { pdfTool(b, { btn: 'Split PDF',
        options: '<label>Mode<select data-k="mode"><option value="range">Extract pages to one PDF</option><option value="each">Every page as a separate PDF (ZIP)</option></select></label><label>Pages (for extract)<input data-k="range" type="text" placeholder="1-3, 5" value="1"></label>',
        run: function (c) { return PDFLib.PDFDocument.load(c.bytes).then(function (src) {
          if (c.val('mode') === 'each') { needJs(); var zip = new JSZip(); return seq(c.pages, function (i) { c.say('Page ' + (i + 1) + ' of ' + c.pages + '...'); return PDFLib.PDFDocument.create().then(function (d) { return d.copyPages(src, [i]).then(function (p) { d.addPage(p[0]); return d.save(); }); }).then(function (by) { zip.file('page-' + (i + 1) + '.pdf', by); }); }).then(function () { return zip.generateAsync({ type: 'blob' }); }).then(function (blob) { return { blob: blob, name: 'split-pages.zip' }; }); }
          var idx = parseRange(c.val('range'), c.pages); if (!idx || !idx.length) throw new Error('Type the pages you want, for example 1-3, 5.');
          return PDFLib.PDFDocument.create().then(function (d) { return d.copyPages(src, idx).then(function (pg) { pg.forEach(function (p) { d.addPage(p); }); return d.save(); }); }).then(function (by) { return { blob: blobPdf(by), name: 'extracted.pdf' }; });
        }); } }); } },

    { id: 'rotate', name: 'Rotate PDF', badge: 'ROT', c: 'green', desc: 'Turn pages 90, 180 or 270 degrees and save.',
      lead: 'Fix sideways or upside-down pages. Rotate every page or only the ones you pick.',
      how: ['Choose a PDF.', 'Pick the angle. Leave pages empty to rotate all pages.', 'Press Rotate PDF and save the result.'],
      about: 'Scanned documents often come out sideways. Rotating changes how each page is displayed without redrawing the content, so quality is not affected. You can rotate the whole file or just selected pages.',
      init: function (b) { pdfTool(b, { btn: 'Rotate PDF',
        options: '<label>Angle<select data-k="deg"><option value="90">90 clockwise</option><option value="180">180</option><option value="270">270 (90 counter-clockwise)</option></select></label><label>Pages (empty = all)<input data-k="range" type="text" placeholder="all pages"></label>',
        run: function (c) { var idx = parseRange(c.val('range'), c.pages), deg = +c.val('deg'), set = {}; if (idx) idx.forEach(function (i) { set[i] = 1; });
          return PDFLib.PDFDocument.load(c.bytes).then(function (d) { d.getPages().forEach(function (p, i) { if (!idx || set[i]) p.setRotation(PDFLib.degrees((p.getRotation().angle + deg) % 360)); }); return d.save(); }).then(function (by) { return { blob: blobPdf(by), name: 'rotated.pdf' }; }); } }); } },

    { id: 'remove', name: 'Remove Pages', badge: 'DEL', c: 'sky', desc: 'Delete unwanted pages from a PDF.',
      lead: 'Type the pages to delete. The rest stay in order in a new file.',
      how: ['Choose a PDF.', 'Type the pages to remove, like 2, 5-7.', 'Press Remove pages and save the result.'],
      about: 'Remove blank pages, cover sheets or anything you do not want to share. Your original file is never changed. You get a new PDF with only the pages you kept.',
      init: function (b) { pdfTool(b, { btn: 'Remove pages',
        options: '<label>Pages to remove<input data-k="range" type="text" placeholder="2, 5-7"></label>',
        run: function (c) { var idx = parseRange(c.val('range'), c.pages); if (!idx || !idx.length) throw new Error('Type the pages to remove, for example 2, 5-7.'); if (idx.length >= c.pages) throw new Error('You cannot remove every page.');
          return PDFLib.PDFDocument.load(c.bytes).then(function (d) { idx.slice().reverse().forEach(function (i) { d.removePage(i); }); return d.save(); }).then(function (by) { return { blob: blobPdf(by), name: 'pages-removed.pdf' }; }); } }); } },

    { id: 'number', name: 'Add Page Numbers', badge: 'No.', c: 'red', desc: 'Stamp page numbers on every page.',
      lead: 'Add clean page numbers at the bottom of each page. Choose position, size and style.',
      how: ['Choose a PDF.', 'Pick the position, style and first number.', 'Press Add page numbers and save the result.'],
      about: 'Page numbers make long documents easier to read, print and discuss. Choose a plain number or the Page 1 of 10 style. Numbers are drawn at the bottom of each page in a neutral dark grey.',
      init: function (b) { pdfTool(b, { btn: 'Add page numbers',
        options: '<label>Position<select data-k="pos"><option value="center">Bottom centre</option><option value="right">Bottom right</option><option value="left">Bottom left</option></select></label><label>Style<select data-k="fmt"><option value="n">1, 2, 3</option><option value="of">Page 1 of 10</option></select></label><label>Start at<input data-k="start" type="number" value="1" min="0"></label><label>Size<select data-k="size"><option>10</option><option selected>12</option><option>14</option><option>18</option></select></label>',
        run: function (c) { return PDFLib.PDFDocument.load(c.bytes).then(function (d) { return d.embedFont(PDFLib.StandardFonts.Helvetica).then(function (font) {
          var start = parseInt(c.val('start'), 10); if (isNaN(start)) start = 1; var size = +c.val('size'), pos = c.val('pos'), st = c.val('fmt'), pgs = d.getPages();
          pgs.forEach(function (p, i) { var n = start + i, t = st === 'of' ? 'Page ' + n + ' of ' + (start + pgs.length - 1) : String(n), w = font.widthOfTextAtSize(t, size), W = p.getSize().width, x = pos === 'left' ? 36 : pos === 'right' ? W - 36 - w : (W - w) / 2; p.drawText(t, { x: x, y: 24, size: size, font: font, color: PDFLib.rgb(.2, .2, .2) }); });
          return d.save(); }); }).then(function (by) { return { blob: blobPdf(by), name: 'numbered.pdf' }; }); } }); } },

    { id: 'pdf2jpg', name: 'PDF to JPG', badge: 'JPG', c: 'amber', desc: 'Turn every PDF page into a JPG image.',
      lead: 'Convert each page to a JPG picture. You get a ZIP file, or a single JPG for one-page PDFs.',
      how: ['Choose a PDF.', 'Pick the image quality.', 'Press Convert to JPG and save the result.'],
      about: 'Converting PDF pages to images is handy for sharing a page in a chat, adding it to a slide or posting it online. Higher quality gives sharper text but a larger file.',
      init: function (b) { pdfTool(b, { btn: 'Convert to JPG',
        options: '<label>Quality<select data-k="q"><option value="2">High (sharp)</option><option value="1.4" selected>Medium</option><option value="1">Low (small files)</option></select></label>',
        run: function (c) { needJs(); var sc = +c.val('q'), zip = new JSZip(), single = null;
          return pdfjsLib.getDocument({ data: new Uint8Array(c.bytes.slice(0)) }).promise.then(function (pdf) {
            return seq(pdf.numPages, function (i) { c.say('Converting page ' + (i + 1) + ' of ' + pdf.numPages + '...'); return pdf.getPage(i + 1).then(function (pg) { return pageToJpeg(pg, sc, .9); }).then(function (bl) { if (pdf.numPages === 1) single = bl; zip.file('page-' + (i + 1) + '.jpg', bl); }); })
              .then(function () { return single ? { blob: single, name: 'page-1.jpg' } : zip.generateAsync({ type: 'blob' }).then(function (bl) { return { blob: bl, name: 'pdf-pages.zip' }; }); });
          }); } }); } },

    { id: 'jpg2pdf', name: 'JPG to PDF', badge: 'IMG', c: 'green', desc: 'Put photos and scans into one PDF document.',
      lead: 'Each image becomes one page. JPG and PNG files are supported.',
      how: ['Select your photos or scans.', 'Arrange the pages in order.', 'Press Create PDF and save the file.'],
      about: 'A PDF is easier to share than a folder of pictures. Pages keep the shape of your images, so photos are not stretched. For scanned paperwork, take photos in good light and hold the phone straight above the page.',
      init: function (b) { multiTool(b, { accept: 'image/jpeg,image/png,.jpg,.jpeg,.png', label: 'Select images', hint: 'Please choose JPG or PNG images.', dropHint: 'or drop images here', side: 'Each image becomes one page, in this order.', badge: 'IMG', color: 'var(--accent)', min: 1, btn: 'Create PDF', out: 'images.pdf',
        ok: function (f) { return /^image\/(jpeg|png)$/.test(f.type) || /\.(jpe?g|png)$/i.test(f.name); },
        run: function (files) { return PDFLib.PDFDocument.create().then(function (out) { return seq(files.length, function (i) { var f = files[i]; return f.arrayBuffer().then(function (buf) { return (/png$/i.test(f.type) || /\.png$/i.test(f.name)) ? out.embedPng(buf) : out.embedJpg(buf); }).then(function (img) { var s = Math.min(1, 595 / img.width, 842 / img.height), w = img.width * s, h = img.height * s, p = out.addPage([w, h]); p.drawImage(img, { x: 0, y: 0, width: w, height: h }); }); }).then(function () { return out.save(); }); }); } }); } },

    { id: 'compress', name: 'Compress PDF', badge: 'ZIP', c: 'sky', desc: 'Make a big PDF smaller for email and uploads.',
      lead: 'Shrink scanned or image-heavy PDFs. Pages are re-saved as compressed images.',
      how: ['Choose a PDF.', 'Pick how small you want it.', 'Press Compress PDF and compare the sizes.'],
      about: 'This tool turns each page into a compressed image, which works best for scans and photo-based PDFs. Text pages become images too, so the text can no longer be selected. If your file gets bigger, keep the original.',
      init: function (b) { pdfTool(b, { btn: 'Compress PDF',
        options: '<label>Compression<select data-k="lvl"><option value="hi">Light (best quality)</option><option value="med" selected>Medium</option><option value="lo">Strong (smallest)</option></select></label>',
        run: function (c) { needJs(); var m = { hi: [1.6, .8], med: [1.25, .6], lo: [1, .4] }[c.val('lvl')], before = c.bytes.byteLength;
          return pdfjsLib.getDocument({ data: new Uint8Array(c.bytes.slice(0)) }).promise.then(function (pdf) { return PDFLib.PDFDocument.create().then(function (out) {
            return seq(pdf.numPages, function (i) { c.say('Compressing page ' + (i + 1) + ' of ' + pdf.numPages + '...'); return pdf.getPage(i + 1).then(function (pg) { var base = pg.getViewport({ scale: 1 }); return pageToJpeg(pg, m[0], m[1]).then(function (bl) { return bl.arrayBuffer(); }).then(function (buf) { return out.embedJpg(buf); }).then(function (img) { var p = out.addPage([base.width, base.height]); p.drawImage(img, { x: 0, y: 0, width: base.width, height: base.height }); }); }); })
              .then(function () { return out.save(); }); }); })
            .then(function (by) { var after = by.length; return { blob: blobPdf(by), name: 'compressed.pdf', note: after < before ? 'Done. ' + fmt(before) + ' became ' + fmt(after) + ' (' + Math.round(100 - after / before * 100) + '% smaller).' : 'Done, but the new file (' + fmt(after) + ') is not smaller than the original (' + fmt(before) + '). Keep the original.' }; }); } }); } },

    { id: 'words', name: 'Word Counter', badge: 'Aa', c: 'red', desc: 'Words, characters, sentences and reading time.',
      lead: 'Paste or type your text. The numbers update as you write.',
      how: ['Type or paste your text into the box.', 'Read the counts that update instantly.', 'Edit your text until it fits your limit.'],
      about: 'Short social posts work best under 50 words, good blog posts often run 1,000 to 2,000 words, and a typical school essay is 500 to 1,500. Reading time assumes about 230 words per minute.',
      init: function (b) { b.innerHTML = '<label class="tag" for="wc-text">Your text</label><textarea id="wc-text" placeholder="Start typing or paste your text here...">Doc Writer Lab keeps your files on your own device. Type here to see the counts change.</textarea><div class="stats"><div class="stat"><b id="wc-w">0</b><span>Words</span></div><div class="stat"><b id="wc-c">0</b><span>Characters</span></div><div class="stat"><b id="wc-n">0</b><span>No spaces</span></div><div class="stat"><b id="wc-s">0</b><span>Sentences</span></div><div class="stat"><b id="wc-r">0</b><span>Min to read</span></div></div>';
        var ta = $('wc-text'); function count() { var t = ta.value, tr = t.trim(), w = tr ? tr.split(/\s+/).length : 0; $('wc-w').textContent = w; $('wc-c').textContent = t.length; $('wc-n').textContent = t.replace(/\s/g, '').length; $('wc-s').textContent = (t.match(/[^.!?]+[.!?]+/g) || []).length || (tr ? 1 : 0); $('wc-r').textContent = w ? Math.max(1, Math.round(w / 230)) : 0; }
        ta.addEventListener('input', count); count(); } },

    { id: 'case', name: 'Case Converter', badge: 'aA', c: 'amber', desc: 'UPPERCASE, lowercase, Title Case and more.',
      lead: 'Type or paste text, then press a button to change its case.',
      how: ['Paste your text into the box.', 'Press the case you want.', 'Press Copy to use the result.'],
      about: 'Fix text that was typed with caps lock on, format headings in Title Case or tidy a block of text into sentence case. Everything happens in your browser.',
      init: function (b) { b.innerHTML = '<label class="tag" for="cc-text">Your text</label><textarea id="cc-text" placeholder="Type or paste text here...">Doc Writer Lab makes everyday document jobs simple. try the buttons below.</textarea><div class="row"><button class="btn" data-c="upper">UPPERCASE</button><button class="btn" data-c="lower">lowercase</button><button class="btn" data-c="title">Title Case</button><button class="btn" data-c="sentence">Sentence case</button><button class="btn alt" data-c="copy">Copy</button></div><p class="msg" id="cc-msg" role="status"></p>';
        var ta = $('cc-text');
        b.addEventListener('click', function (e) { var k = e.target.getAttribute && e.target.getAttribute('data-c'); if (!k) return; var t = ta.value;
          if (k === 'upper') ta.value = t.toUpperCase(); else if (k === 'lower') ta.value = t.toLowerCase();
          else if (k === 'title') ta.value = t.toLowerCase().replace(/(^|\s)(\S)/g, function (m, a, c) { return a + c.toUpperCase(); });
          else if (k === 'sentence') ta.value = t.toLowerCase().replace(/(^\s*|[.!?]\s+)(\S)/g, function (m, a, c) { return a + c.toUpperCase(); });
          else if (k === 'copy') { var done = function () { $('cc-msg').textContent = 'Copied.'; }; try { navigator.clipboard.writeText(ta.value).then(done, function () { ta.select(); $('cc-msg').textContent = 'Text selected. Press Ctrl+C to copy.'; }); } catch (x) { ta.select(); $('cc-msg').textContent = 'Text selected. Press Ctrl+C to copy.'; } } }); } },

    { id: 'percent', name: 'Percentage Calculator', badge: '%', c: 'green', desc: 'Find a percentage, a share or a percent change.',
      lead: 'Three quick calculators. Type numbers and the answer appears at once.',
      how: ['Pick the calculator that matches your question.', 'Type your two numbers.', 'Read the answer next to them.'],
      about: 'Use the first box for discounts and tips, the second to see what share one number is of another, and the third for growth or drops such as price changes. A negative change means a decrease.',
      init: function (b) { b.innerHTML = '<div class="calc"><div class="row"><span>What is</span><input id="p1a" type="number" value="15" aria-label="Percent"><span>% of</span><input id="p1b" type="number" value="240" aria-label="Number"><span>?</span></div><div class="res" id="p1r"></div></div><div class="calc"><div class="row"><input id="p2a" type="number" value="30" aria-label="Part"><span>is what % of</span><input id="p2b" type="number" value="120" aria-label="Whole"><span>?</span></div><div class="res" id="p2r"></div></div><div class="calc"><div class="row"><span>Change from</span><input id="p3a" type="number" value="80" aria-label="Old value"><span>to</span><input id="p3b" type="number" value="100" aria-label="New value"><span>?</span></div><div class="res" id="p3r"></div></div>';
        function g(i) { return parseFloat($(i).value); }
        function calc() { var a = g('p1a'), c = g('p1b'); $('p1r').textContent = isNaN(a + c) ? '' : num(a / 100 * c);
          a = g('p2a'); c = g('p2b'); $('p2r').textContent = isNaN(a + c) || c === 0 ? '' : num(a / c * 100) + '%';
          a = g('p3a'); c = g('p3b'); $('p3r').textContent = isNaN(a + c) || a === 0 ? '' : (c >= a ? '+' : '') + num((c - a) / Math.abs(a) * 100) + '%'; }
        b.addEventListener('input', calc); calc(); } },

    { id: 'age', name: 'Age Calculator', badge: 'Age', c: 'sky', desc: 'Exact age in years, months and days.',
      lead: 'Enter a date of birth to see the exact age and the next birthday.',
      how: ['Pick the date of birth.', 'Leave the second date as today, or change it.', 'Read the age and days until the next birthday.'],
      about: 'The calculator counts full years, then the remaining months and days, and also shows the total number of days lived. Change the second date to find an age on any day, past or future.',
      init: function (b) { b.innerHTML = '<div class="row"><label for="age-dob">Date of birth<input id="age-dob" type="date" value="2000-01-15"></label><label for="age-on">Age on<input id="age-on" type="date"></label></div><div class="stats"><div class="stat"><b id="a-y">0</b><span>Years</span></div><div class="stat"><b id="a-m">0</b><span>Months</span></div><div class="stat"><b id="a-d">0</b><span>Days</span></div><div class="stat"><b id="a-t">0</b><span>Total days lived</span></div></div><p class="msg" id="a-next" role="status"></p>';
        var d = new Date(); $('age-on').value = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
        function age() { var bv = $('age-dob').value, ov = $('age-on').value, nx = $('a-next'); nx.className = 'msg'; if (!bv || !ov) return;
          var d1 = new Date(bv + 'T00:00:00'), d2 = new Date(ov + 'T00:00:00');
          if (d2 < d1) { nx.className = 'msg err'; nx.textContent = 'The date of birth must be before the second date.'; return; }
          var y = d2.getFullYear() - d1.getFullYear(), m = d2.getMonth() - d1.getMonth(), dd = d2.getDate() - d1.getDate();
          if (dd < 0) { m--; dd += new Date(d2.getFullYear(), d2.getMonth(), 0).getDate(); } if (m < 0) { y--; m += 12; }
          $('a-y').textContent = y; $('a-m').textContent = m; $('a-d').textContent = dd; $('a-t').textContent = Math.round((d2 - d1) / 86400000).toLocaleString('en-US');
          var nb = new Date(d2.getFullYear(), d1.getMonth(), d1.getDate()); if (nb <= d2) nb = new Date(d2.getFullYear() + 1, d1.getMonth(), d1.getDate());
          var left = Math.round((nb - d2) / 86400000); nx.textContent = 'Next birthday in ' + left + ' day' + (left === 1 ? '' : 's') + ' (turning ' + (nb.getFullYear() - d1.getFullYear()) + ').'; }
        $('age-dob').addEventListener('input', age); $('age-on').addEventListener('input', age); age(); } }
,
    { id: 'extract', name: 'Extract PDF Pages', badge: 'EXT', c: 'amber', desc: 'Save selected pages into a separate PDF.',
      lead: 'Choose exact pages to extract without changing your original file.',
      how: ['Choose a PDF.', 'Enter page numbers or ranges, such as 1-3, 5.', 'Create and download the extracted PDF.'],
      about: 'Extracting creates a new PDF containing only the selected pages.',
      init: function (b) { pdfTool(b, { btn: 'Extract pages',
        options: '<label>Pages to keep<input data-k="range" type="text" placeholder="1-3, 5" value="1"></label>',
        run: function (c) { var idx = parseRange(c.val('range'), c.pages); if (!idx || !idx.length) throw new Error('Enter pages to extract, for example 1-3, 5.'); return PDFLib.PDFDocument.load(c.bytes).then(function (src) { return PDFLib.PDFDocument.create().then(function (out) { return out.copyPages(src, idx).then(function (pages) { pages.forEach(function (p) { out.addPage(p); }); return out.save(); }); }); }).then(function (by) { return { blob: blobPdf(by), name: 'extracted-pages.pdf' }; }); } }); } },

    { id: 'organize', name: 'Reorder PDF Pages', badge: 'ORD', c: 'green', desc: 'Reorder pages by entering the page sequence.',
      lead: 'Create a new PDF in a custom page order.',
      how: ['Choose a PDF.', 'Enter every page number in the desired order, separated by commas.', 'Save and review the reordered PDF.'],
      about: 'Enter a full page sequence such as 3,1,2. Each original page number must appear exactly once.',
      init: function (b) { pdfTool(b, { btn: 'Reorder pages',
        options: '<label>New page order<input data-k="order" type="text" placeholder="3, 1, 2"></label>',
        run: function (c) { var raw = c.val('order').split(',').map(function (x) { return x.trim(); }).filter(Boolean); if (raw.length !== c.pages) throw new Error('Enter all ' + c.pages + ' page numbers exactly once.'); var idx = raw.map(function (x) { var n = Number(x); if (!Number.isInteger(n) || n < 1 || n > c.pages) throw new Error('Page numbers must be between 1 and ' + c.pages + '.'); return n - 1; }); if (new Set(idx).size !== c.pages) throw new Error('Each page number must appear exactly once.'); return PDFLib.PDFDocument.load(c.bytes).then(function (src) { return PDFLib.PDFDocument.create().then(function (out) { return out.copyPages(src, idx).then(function (pages) { pages.forEach(function (p) { out.addPage(p); }); return out.save(); }); }); }).then(function (by) { return { blob: blobPdf(by), name: 'reordered.pdf' }; }); } }); } },

    { id: 'watermark', name: 'Add PDF Watermark', badge: 'WM', c: 'red', desc: 'Stamp text across every page of a PDF.',
      lead: 'Add a simple text watermark such as DRAFT or CONFIDENTIAL.',
      how: ['Choose a PDF.', 'Enter watermark text and size.', 'Save the watermarked copy.'],
      about: 'This tool adds visible text to each page. It does not encrypt the PDF or prevent copying.',
      init: function (b) { pdfTool(b, { btn: 'Add watermark',
        options: '<label>Watermark text<input data-k="text" type="text" value="DRAFT" maxlength="60"></label><label>Text size<select data-k="size"><option>24</option><option selected>40</option><option>60</option></select></label>',
        run: function (c) { var text = c.val('text').trim(); if (!text) throw new Error('Enter watermark text.'); var size = +c.val('size'); return PDFLib.PDFDocument.load(c.bytes).then(function (d) { return d.embedFont(PDFLib.StandardFonts.Helvetica).then(function (font) { d.getPages().forEach(function (p) { var z = p.getSize(); p.drawText(text, { x: z.width * .12, y: z.height * .5, size: size, font: font, color: PDFLib.rgb(.55,.55,.55), rotate: PDFLib.degrees(35), opacity: .28 }); }); return d.save(); }); }).then(function (by) { return { blob: blobPdf(by), name: 'watermarked.pdf' }; }); } }); } },

    { id: 'crop', name: 'Crop PDF Pages', badge: 'CRP', c: 'sky', desc: 'Crop equal margins from all pages.',
      lead: 'Trim a percentage from each page edge to hide blank margins.',
      how: ['Choose a PDF.', 'Set the margin percentage to trim from each edge.', 'Download and inspect the cropped copy.'],
      about: 'Cropping changes the visible page area; it does not securely erase information outside the crop box.',
      init: function (b) { pdfTool(b, { btn: 'Crop pages',
        options: '<label>Margin to trim from each edge (%)<input data-k="margin" type="number" min="0" max="35" value="5"></label>',
        run: function (c) { var pct = Number(c.val('margin')); if (!Number.isFinite(pct) || pct < 0 || pct > 35) throw new Error('Choose a margin between 0 and 35 percent.'); return PDFLib.PDFDocument.load(c.bytes).then(function (d) { d.getPages().forEach(function (p) { var z = p.getSize(), mx = z.width * pct / 100, my = z.height * pct / 100; p.setCropBox(mx, my, z.width - 2 * mx, z.height - 2 * my); }); return d.save(); }).then(function (by) { return { blob: blobPdf(by), name: 'cropped.pdf' }; }); } }); } },

    { id: 'pdf2text', name: 'PDF to Text', badge: 'TXT', c: 'amber', desc: 'Extract selectable text from PDF pages.',
      lead: 'Export text from text-based PDFs into a plain text file.',
      how: ['Choose a PDF.', 'Wait while its pages are read.', 'Download the extracted text file.'],
      about: 'Scanned pages without a text layer need OCR; this tool extracts text already embedded in the PDF.',
      init: function (b) { pdfTool(b, { btn: 'Extract text',
        run: function (c) { needJs(); return pdfjsLib.getDocument({ data: new Uint8Array(c.bytes.slice(0)) }).promise.then(function (pdf) { var parts = []; return seq(pdf.numPages, function (i) { c.say('Reading page ' + (i + 1) + ' of ' + pdf.numPages + '...'); return pdf.getPage(i + 1).then(function (pg) { return pg.getTextContent(); }).then(function (tc) { parts.push('\n--- Page ' + (i + 1) + ' ---\n' + tc.items.map(function (x) { return x.str || ''; }).join(' ')); }); }).then(function () { return { blob: new Blob([parts.join('\n')], { type: 'text/plain;charset=utf-8' }), name: 'extracted-text.txt' }; }); }); } }); } },

    { id: 'sign', name: 'Sign PDF', badge: 'SIGN', c: 'green', desc: 'Add a typed signature to a PDF page.',
      lead: 'Place a visible typed signature on the page you choose.',
      how: ['Choose a PDF.', 'Enter your name and choose a page and position.', 'Download the signed copy and review it.'],
      about: 'This adds a visual, typed signature only. It is not a cryptographic digital signature or identity verification.',
      init: function (b) { pdfTool(b, { btn: 'Add signature',
        options: '<label>Signature name<input data-k="sig" type="text" maxlength="80" placeholder="Your full name"></label><label>Page number<input data-k="page" type="number" min="1" value="1"></label><label>Position<select data-k="pos"><option value="left">Bottom left</option><option value="center" selected>Bottom centre</option><option value="right">Bottom right</option></select></label><label>Text size<select data-k="size"><option>18</option><option selected>24</option><option>30</option><option>36</option></select></label>',
        run: function (c) { var sig = c.val('sig').trim(), pageNo = Number(c.val('page')), size = Number(c.val('size')), pos = c.val('pos'); if (!sig) throw new Error('Enter the name to sign with.'); if (!Number.isInteger(pageNo) || pageNo < 1 || pageNo > c.pages) throw new Error('Choose a page from 1 to ' + c.pages + '.'); return PDFLib.PDFDocument.load(c.bytes).then(function (d) { return d.embedFont(PDFLib.StandardFonts.HelveticaOblique).then(function (font) { var p = d.getPages()[pageNo - 1], z = p.getSize(), w = font.widthOfTextAtSize(sig, size), x = pos === 'left' ? 36 : pos === 'right' ? z.width - 36 - w : (z.width - w) / 2; if (x < 8) x = 8; p.drawText(sig, { x: x, y: 38, size: size, font: font, color: PDFLib.rgb(.08,.18,.3) }); return d.save(); }); }).then(function (by) { return { blob: blobPdf(by), name: 'signed.pdf', note: 'Typed signature added. This is not a verified digital signature.' }; }); } }); } },

    { id: 'addtext', name: 'Add Text to PDF', badge: 'TXT+', c: 'sky', desc: 'Place a text note or label on PDF pages.',
      lead: 'Add a short note, label or reference directly onto a PDF.',
      how: ['Choose a PDF.', 'Enter your text and select the page and position.', 'Download the updated PDF.'],
      about: 'Text is placed visibly over the existing page. It does not edit or remove original text underneath.',
      init: function (b) { pdfTool(b, { btn: 'Add text',
        options: '<label>Text to add<input data-k="text" type="text" maxlength="180" placeholder="Enter text"></label><label>Page number or all pages<input data-k="page" type="text" value="all" placeholder="all or 2"></label><label>Horizontal position<select data-k="pos"><option value="left">Left</option><option value="center" selected>Centre</option><option value="right">Right</option></select></label><label>Vertical position<select data-k="vert"><option value="top">Top</option><option value="middle">Middle</option><option value="bottom" selected>Bottom</option></select></label><label>Text size<select data-k="size"><option>10</option><option selected>14</option><option>18</option><option>24</option></select></label>',
        run: function (c) { var txt = c.val('text').trim(), pageChoice = c.val('page').trim().toLowerCase(), pos = c.val('pos'), vert = c.val('vert'), size = Number(c.val('size')); if (!txt) throw new Error('Enter the text to add.'); if (pageChoice !== 'all' && (!/^\d+$/.test(pageChoice) || Number(pageChoice) < 1 || Number(pageChoice) > c.pages)) throw new Error('Enter all or a page number from 1 to ' + c.pages + '.'); return PDFLib.PDFDocument.load(c.bytes).then(function (d) { return d.embedFont(PDFLib.StandardFonts.Helvetica).then(function (font) { var pages = d.getPages(), chosen = pageChoice === 'all' ? pages : [pages[Number(pageChoice) - 1]]; chosen.forEach(function (p) { var z = p.getSize(), w = font.widthOfTextAtSize(txt, size), x = pos === 'left' ? 28 : pos === 'right' ? z.width - 28 - w : (z.width - w) / 2, y = vert === 'top' ? z.height - size - 28 : vert === 'middle' ? (z.height - size) / 2 : 28; p.drawText(txt, { x: Math.max(8,x), y: Math.max(8,y), size: size, font: font, color: PDFLib.rgb(.12,.2,.28) }); }); return d.save(); }); }).then(function (by) { return { blob: blobPdf(by), name: 'text-added.pdf' }; }); } }); } },

    { id: 'flatten', name: 'Flatten PDF Forms', badge: 'FLAT', c: 'amber', desc: 'Make interactive form fields non-editable.',
      lead: 'Save form field appearances into the page so the filled form is less easily changed.',
      how: ['Choose a PDF with interactive form fields.', 'Press Flatten form fields.', 'Download and check the flattened copy.'],
      about: 'Flattening removes interactive form controls after drawing their appearances. It does not encrypt the document or provide tamper-proof legal evidence.',
      init: function (b) { pdfTool(b, { btn: 'Flatten form fields',
        run: function (c) { return PDFLib.PDFDocument.load(c.bytes).then(function (d) { var form = d.getForm(); if (!form.getFields().length) throw new Error('This PDF has no supported interactive form fields to flatten.'); form.updateFieldAppearances(); form.flatten(); return d.save(); }).then(function (by) { return { blob: blobPdf(by), name: 'flattened-form.pdf' }; }); } }); } }
,

    { id: 'charcount', name: 'Character Counter', badge: 'ABC', c: 'sky', desc: 'Count characters with or without spaces.',
      lead: 'Paste text to count characters, letters, digits and spaces instantly.',
      how: ['Paste or type text.', 'Watch the live character totals.', 'Copy your finished text if needed.'],
      about: 'Check character limits for titles, descriptions, social posts and forms. Counts update locally as you type.',
      init: function (b) { b.innerHTML = '<label class="tag">Your text</label><textarea id="charcount-in" placeholder="Type or paste text…"></textarea><div class="stats"><div class="stat"><b id="charcount-all">0</b><span>Characters</span></div><div class="stat"><b id="charcount-ns">0</b><span>Without spaces</span></div><div class="stat"><b id="charcount-letters">0</b><span>Letters</span></div><div class="stat"><b id="charcount-digits">0</b><span>Digits</span></div></div>'; var x=$('charcount-in'); function u(){var t=x.value;$('charcount-all').textContent=t.length;$('charcount-ns').textContent=t.replace(/\s/g,'').length;$('charcount-letters').textContent=(t.match(/[A-Za-z]/g)||[]).length;$('charcount-digits').textContent=(t.match(/[0-9]/g)||[]).length;} x.addEventListener('input',u);u(); } },
    { id: 'sentencecount', name: 'Sentence Counter', badge: 'S.', c: 'amber', desc: 'Count sentences and estimate reading time.',
      lead: 'Paste a paragraph to count sentences, words and estimated reading time.',
      how: ['Paste your paragraph.', 'Review the sentence and word totals.', 'Edit the text to meet your target.'],
      about: 'Useful when editing articles, essays and reports. Reading time is estimated at 230 words per minute.',
      init: function (b) { b.innerHTML = '<label class="tag">Your text</label><textarea id="sent-in" placeholder="Paste sentences here…"></textarea><div class="stats"><div class="stat"><b id="sent-s">0</b><span>Sentences</span></div><div class="stat"><b id="sent-w">0</b><span>Words</span></div><div class="stat"><b id="sent-r">0</b><span>Reading min</span></div></div>';var x=$('sent-in');function u(){var t=x.value.trim(),w=t?(t.match(/\S+/g)||[]).length:0,s=t?(t.match(/[^.!?]+[.!?]+|[^.!?]+$/g)||[]).filter(function(z){return z.trim();}).length:0;$('sent-s').textContent=s;$('sent-w').textContent=w;$('sent-r').textContent=w?Math.max(1,Math.ceil(w/230)):0;}x.addEventListener('input',u);u();} },
    { id: 'linecount', name: 'Line Counter', badge: '≡', c: 'green', desc: 'Count lines, non-empty lines and paragraphs.',
      lead: 'Paste text to see total lines, non-empty lines and paragraphs.',
      how: ['Paste your text.', 'Check the live line and paragraph counts.', 'Copy or edit your source text.'],
      about: 'Handy for scripts, lists, notes and text files where line counts matter.',
      init: function (b) { b.innerHTML='<label class="tag">Your text</label><textarea id="line-in" placeholder="Paste text here…"></textarea><div class="stats"><div class="stat"><b id="line-all">0</b><span>Lines</span></div><div class="stat"><b id="line-non">0</b><span>Non-empty</span></div><div class="stat"><b id="line-para">0</b><span>Paragraphs</span></div></div>';var x=$('line-in');function u(){var t=x.value,ls=t?t.split(/\r\n|\n|\r/):[];$('line-all').textContent=ls.length;$('line-non').textContent=ls.filter(function(v){return v.trim();}).length;$('line-para').textContent=t.trim()?(t.trim().match(/\S(?:[\s\S]*?\S)?(?=\n\s*\n|$)/g)||[]).length:0;}x.addEventListener('input',u);u();} },
    { id: 'cleantext', name: 'Text Cleaner', badge: '✦', c: 'sky', desc: 'Remove extra spaces and tidy line breaks.',
      lead: 'Clean pasted text by removing repeated spaces and trimming each line.',
      how: ['Paste text into the input.', 'Choose the cleanup action.', 'Copy the cleaned result.'],
      about: 'Tidy text copied from PDFs, websites and emails. Processing stays in your browser.',
      init: function (b) { b.innerHTML='<label class="tag">Input text</label><textarea id="clean-in" placeholder="Paste text to clean…"></textarea><div class="row"><button class="btn" data-clean="spaces">Fix spaces</button><button class="btn" data-clean="lines">Trim lines</button><button class="btn" data-clean="blank">Remove blank lines</button><button class="btn alt" data-clean="copy">Copy result</button></div><label class="tag">Cleaned result</label><textarea id="clean-out" readonly></textarea><p class="msg" id="clean-msg" role="status"></p>';b.addEventListener('click',function(e){var k=e.target.getAttribute('data-clean');if(!k)return;var t=$('clean-in').value;if(k==='spaces')t=t.replace(/[ \t]{2,}/g,' ').trim();if(k==='lines')t=t.split(/\r?\n/).map(function(v){return v.trim();}).join('\n');if(k==='blank')t=t.split(/\r?\n/).filter(function(v){return v.trim();}).join('\n');if(k==='copy'){var o=$('clean-out');o.select();try{document.execCommand('copy');$('clean-msg').textContent='Copied.';}catch(x){$('clean-msg').textContent='Select the result and copy it.';}return;}$('clean-out').value=t;$('clean-msg').textContent='Text cleaned.';}); } },
    { id: 'dedupe', name: 'Remove Duplicate Lines', badge: '↧', c: 'amber', desc: 'Keep one copy of each unique line.',
      lead: 'Remove repeated lines while keeping the original order.',
      how: ['Paste a list or block of text.', 'Press Remove duplicates.', 'Copy the unique lines.'],
      about: 'Useful for cleaning lists of names, URLs, keywords and records. The first occurrence of each line is preserved.',
      init: function (b) { b.innerHTML='<label class="tag">Your lines</label><textarea id="dedupe-in" placeholder="Paste one item per line…"></textarea><div class="row"><button class="btn" id="dedupe-go">Remove duplicates</button><button class="btn alt" id="dedupe-copy">Copy result</button></div><label class="tag">Unique lines</label><textarea id="dedupe-out" readonly></textarea><p class="msg" id="dedupe-msg" role="status"></p>'; $('dedupe-go').onclick=function(){var a=$('dedupe-in').value.split(/\r?\n/),seen={};$('dedupe-out').value=a.filter(function(v){var k=v.trim().toLowerCase();if(!k||seen[k])return false;seen[k]=1;return true;}).join('\n');$('dedupe-msg').textContent='Duplicates removed.';};$('dedupe-copy').onclick=function(){ $('dedupe-out').select();try{document.execCommand('copy');$('dedupe-msg').textContent='Copied.';}catch(e){$('dedupe-msg').textContent='Select and copy the result.';} }; } },
    { id: 'sortlines', name: 'Sort Lines', badge: 'A↕', c: 'green', desc: 'Sort text lines alphabetically or reverse them.',
      lead: 'Sort a list alphabetically, Z to A, or reverse its current order.',
      how: ['Paste one item per line.', 'Choose a sort order.', 'Copy the sorted result.'],
      about: 'Sort keyword lists, names, titles or any plain-text list directly in your browser.',
      init: function (b) { b.innerHTML='<label class="tag">Lines to sort</label><textarea id="sort-in" placeholder="One item per line…"></textarea><div class="row"><button class="btn" data-sort="az">A to Z</button><button class="btn" data-sort="za">Z to A</button><button class="btn" data-sort="reverse">Reverse</button><button class="btn alt" data-sort="copy">Copy</button></div><label class="tag">Sorted result</label><textarea id="sort-out" readonly></textarea><p class="msg" id="sort-msg" role="status"></p>';b.addEventListener('click',function(e){var k=e.target.getAttribute('data-sort');if(!k)return;if(k==='copy'){$('sort-out').select();try{document.execCommand('copy');$('sort-msg').textContent='Copied.';}catch(x){$('sort-msg').textContent='Select and copy the result.';}return;}var a=$('sort-in').value.split(/\r?\n/);if(k==='az')a.sort(function(x,y){return x.localeCompare(y);});if(k==='za')a.sort(function(x,y){return y.localeCompare(x);});if(k==='reverse')a.reverse();$('sort-out').value=a.join('\n');$('sort-msg').textContent='Lines sorted.';}); } },
    { id: 'reverse', name: 'Reverse Text', badge: '↔', c: 'red', desc: 'Reverse characters or reverse line order.',
      lead: 'Reverse the character order or flip the order of lines.',
      how: ['Paste text.', 'Choose characters or lines.', 'Copy the result.'],
      about: 'A quick text utility for reversing a string or changing the order of a list.',
      init: function (b) { b.innerHTML='<label class="tag">Your text</label><textarea id="rev-in" placeholder="Type or paste text…"></textarea><div class="row"><button class="btn" data-rev="chars">Reverse characters</button><button class="btn" data-rev="lines">Reverse lines</button><button class="btn alt" data-rev="copy">Copy</button></div><label class="tag">Result</label><textarea id="rev-out" readonly></textarea><p class="msg" id="rev-msg" role="status"></p>';b.addEventListener('click',function(e){var k=e.target.getAttribute('data-rev');if(!k)return;if(k==='copy'){$('rev-out').select();try{document.execCommand('copy');$('rev-msg').textContent='Copied.';}catch(x){$('rev-msg').textContent='Select and copy the result.';}return;}var t=$('rev-in').value;$('rev-out').value=k==='chars'?Array.from(t).reverse().join(''):t.split(/\r?\n/).reverse().join('\n');$('rev-msg').textContent='Done.';}); } },
    { id: 'findreplace', name: 'Find & Replace Text', badge: '⌕', c: 'sky', desc: 'Replace a word or phrase throughout your text.',
      lead: 'Find a phrase and replace every matching occurrence.',
      how: ['Paste your text.', 'Enter the phrase to find and its replacement.', 'Apply the replacement and copy the result.'],
      about: 'Useful for editing drafts, correcting repeated spelling and updating names or terms in a document.',
      init: function (b) { b.innerHTML='<label class="tag">Source text</label><textarea id="fr-in" placeholder="Paste text…"></textarea><div class="row"><label>Find<input id="fr-find" type="text"></label><label>Replace with<input id="fr-repl" type="text"></label></div><div class="row"><button class="btn" id="fr-go">Replace all</button><button class="btn alt" id="fr-copy">Copy result</button></div><label class="tag">Updated text</label><textarea id="fr-out" readonly></textarea><p class="msg" id="fr-msg" role="status"></p>'; $('fr-go').onclick=function(){var f=$('fr-find').value;if(!f){$('fr-msg').textContent='Enter text to find.';return;}var t=$('fr-in').value.split(f).join($('fr-repl').value);$('fr-out').value=t;$('fr-msg').textContent='Replacement complete.';};$('fr-copy').onclick=function(){$('fr-out').select();try{document.execCommand('copy');$('fr-msg').textContent='Copied.';}catch(e){$('fr-msg').textContent='Select and copy the result.';}}; } },
    { id: 'slug', name: 'URL Slug Generator', badge: '#', c: 'amber', desc: 'Turn a title into a clean SEO-friendly slug.',
      lead: 'Convert a page title into a lowercase, hyphen-separated URL slug.',
      how: ['Enter a page title.', 'Generate the slug.', 'Copy it into your page URL.'],
      about: 'A clean slug is short, readable and uses hyphens between words. This tool handles common Latin characters and punctuation.',
      init: function (b) { b.innerHTML='<label class="tag">Page title</label><input id="slug-in" type="text" placeholder="e.g. How to Merge PDF Files"><div class="row"><button class="btn" id="slug-go">Generate slug</button><button class="btn alt" id="slug-copy">Copy</button></div><label class="tag">URL slug</label><input id="slug-out" type="text" readonly><p class="msg" id="slug-msg" role="status"></p>'; $('slug-go').onclick=function(){var t=$('slug-in').value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');$('slug-out').value=t;$('slug-msg').textContent=t?'Slug generated.':'Enter a title first.';};$('slug-copy').onclick=function(){$('slug-out').select();try{document.execCommand('copy');$('slug-msg').textContent='Copied.';}catch(e){$('slug-msg').textContent='Select and copy the slug.';}}; } },
    { id: 'lorem', name: 'Lorem Ipsum Generator', badge: '¶', c: 'green', desc: 'Create placeholder text for drafts and layouts.',
      lead: 'Generate placeholder paragraphs for mockups, drafts and layout testing.',
      how: ['Choose how many paragraphs you need.', 'Generate the placeholder text.', 'Copy it into your draft or design.'],
      about: 'Lorem Ipsum is sample placeholder copy. Replace it with final content before publishing.',
      init: function (b) { b.innerHTML='<div class="row"><label>Paragraphs<input id="lorem-n" type="number" min="1" max="20" value="3"></label><label>Words per paragraph<input id="lorem-w" type="number" min="10" max="120" value="45"></label></div><div class="row"><button class="btn" id="lorem-go">Generate text</button><button class="btn alt" id="lorem-copy">Copy</button></div><textarea id="lorem-out" readonly placeholder="Generated text appears here…"></textarea><p class="msg" id="lorem-msg" role="status"></p>';var sample='lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'.split(' ');$('lorem-go').onclick=function(){var n=Math.max(1,Math.min(20,+$('lorem-n').value||1)),w=Math.max(10,Math.min(120,+$('lorem-w').value||45)),paras=[];for(var p=0;p<n;p++){var words=[];for(var i=0;i<w;i++)words.push(sample[(i+p*7)%sample.length]);paras.push(words.join(' ')+'.');}$('lorem-out').value=paras.join('\n\n');$('lorem-msg').textContent='Placeholder text generated.';};$('lorem-copy').onclick=function(){$('lorem-out').select();try{document.execCommand('copy');$('lorem-msg').textContent='Copied.';}catch(e){$('lorem-msg').textContent='Select and copy the text.';}};$('lorem-go').click(); } }

  ];
  var byId = {}; TOOLS.forEach(function (t) { byId[t.id] = t; });

  /* ---------- mounting tools into a page ---------- */
  function related(id) {
    var cat = (META[id] || [])[0], list = ORDER.filter(function (k) { return k !== id && META[k] && META[k][0] === cat; });
    ORDER.forEach(function (k) { if (k !== id && list.indexOf(k) < 0 && list.length < 6) list.push(k); });
    return list.slice(0, 6).map(function (k) { return '<a href="' + META[k][1] + '">' + tileHTML(k, 'sm') + esc(byId[k].name) + '</a>'; }).join('');
  }
  function mountTool(host, id, opt) {
    var t = byId[id]; if (!t) return null;
    opt = opt || {}; currentTool = t; host.innerHTML = '';
    if (opt.heading) {
      var head = mk('header', 'tp-head', tileHTML(id, 'lg') + '<h1></h1><p class="tp-sub"></p>');
      head.querySelector('h1').textContent = t.name; head.querySelector('.tp-sub').textContent = t.lead;
      host.appendChild(head);
    }
    var ws = mk('div', 'ws'), body = mk('div', 'tool-body'); body.id = 'tool-body';
    ws.appendChild(body); host.appendChild(ws);
    t.init(body);
    if (opt.heading) {
      var info = mk('div', 'prose-wrap');
      var how = mk('section', '', '<h2></h2><ol></ol><p></p>');
      how.querySelector('h2').textContent = 'How to use ' + t.name;
      how.querySelector('ol').innerHTML = t.how.map(function (s) { return '<li>' + s + '</li>'; }).join('');
      how.querySelector('p').textContent = t.about;
      var more = mk('section', '', '<h2>More free tools</h2><div class="related">' + related(id) + '</div>');
      info.appendChild(how); info.appendChild(more); host.appendChild(info);
    }
    return body;
  }
  /* used by the self-test runner */
  function openTool(id) {
    var host = $('st-host');
    if (!host) { host = mk('div', 'container'); host.id = 'st-host'; document.body.appendChild(host); }
    return mountTool(host, id, {});
  }

  /* ---------- header: mega menus, mobile menu, theme ---------- */
  function initHeader() {
    var nav = $('site-nav'), burger = $('burger');
    function closeMega(except) { document.querySelectorAll('.has-mega.open').forEach(function (m) { if (m !== except) { m.classList.remove('open'); var b = m.querySelector('.nav-btn'); if (b) b.setAttribute('aria-expanded', 'false'); } }); }
    document.querySelectorAll('.has-mega > .nav-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation(); var p = btn.parentNode, open = !p.classList.contains('open');
        closeMega(p); p.classList.toggle('open', open); btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });
    document.addEventListener('click', function (e) { if (!e.target.closest || !e.target.closest('.has-mega')) closeMega(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeMega(); if (nav) nav.classList.remove('open'); if (burger) burger.setAttribute('aria-expanded', 'false'); } });
    if (burger && nav) burger.addEventListener('click', function () { var o = nav.classList.toggle('open'); burger.setAttribute('aria-expanded', o ? 'true' : 'false'); document.body.style.overflow = o ? 'hidden' : ''; });
    var tt = $('theme-toggle');
    if (tt) tt.addEventListener('click', function () {
      var root = document.documentElement, cur = root.getAttribute('data-theme');
      if (!cur) cur = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      var next = cur === 'dark' ? 'light' : 'dark'; root.setAttribute('data-theme', next);
      try { localStorage.setItem('dwl-theme', next); } catch (e) {}
    });
    var path = location.pathname.replace(/index\.html$/, '');
    document.querySelectorAll('.nav a').forEach(function (a) { var h = a.getAttribute('href'); if (h && h.split('?')[0] === path) a.setAttribute('aria-current', 'page'); });
  }

  /* ---------- homepage: category tabs + live search ---------- */
  function initHome() {
    var cards = Array.prototype.slice.call(document.querySelectorAll('#tool-grid .tcard')),
        tabs = Array.prototype.slice.call(document.querySelectorAll('.tabs .tab')),
        input = $('tool-search'), empty = $('grid-empty'), cat = 'all';
    function apply() {
      var q = (input.value || '').trim().toLowerCase(), n = 0;
      cards.forEach(function (c) {
        var show = (cat === 'all' || c.getAttribute('data-cat') === cat) && (!q || c.getAttribute('data-q').indexOf(q) > -1);
        c.hidden = !show; if (show) n++;
      });
      if (empty) empty.hidden = n > 0;
    }
    tabs.forEach(function (t) {
      t.addEventListener('click', function () { cat = t.getAttribute('data-cat'); tabs.forEach(function (x) { x.setAttribute('aria-pressed', x === t ? 'true' : 'false'); }); apply(); });
    });
    if (input) {
      input.addEventListener('input', function () {
        if (input.value.trim() && cat !== 'all') { cat = 'all'; tabs.forEach(function (x) { x.setAttribute('aria-pressed', x.getAttribute('data-cat') === 'all' ? 'true' : 'false'); }); }
        apply();
      });
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { var f = cards.filter(function (c) { return !c.hidden; })[0]; if (f) location.href = f.getAttribute('href'); }
      });
      document.addEventListener('keydown', function (e) {
        var tag = document.activeElement && document.activeElement.tagName;
        if (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(tag || '')) { e.preventDefault(); input.focus(); }
      });
      var q = new URLSearchParams(location.search).get('q'); if (q) input.value = q;
      if (location.hash === '#search') input.focus();
    }
    apply();
  }

  /* ---------- page boot ---------- */
  function legacyRedirect() {
    var h = location.hash, m = h.match(/^#tool=([a-z0-9-]+)$/i), qt = new URLSearchParams(location.search).get('tool');
    var id = m ? m[1] : qt;
    if (id && META[id] && $('tool-grid')) { location.replace(META[id][1]); return true; }
    var map = { about: '/about.html', privacy: '/privacy-policy.html', contact: '/contact.html', guides: '/guides/' };
    var k = h.replace(/^#/, '');
    if (map[k] && $('tool-grid')) { location.replace(map[k]); return true; }
    return false;
  }
  function boot() {
    initHeader();
    if (legacyRedirect()) return;
    var mount = $('tool-mount');
    if (mount && byId[mount.getAttribute('data-tool')]) mountTool(mount, mount.getAttribute('data-tool'), { heading: false });
    var host = $('tool-host');
    if (host) {
      var p = new URLSearchParams(location.search), id = p.get('tool') || (location.hash.match(/^#tool=([a-z0-9-]+)$/i) || [])[1];
      if (id && byId[id]) {
        var url = META[id][1];
        if (url.indexOf('/tool.html') !== 0) { location.replace(url); return; }
        document.title = byId[id].name + ' - Free Online | Doc Writer Lab';
        mountTool(host, id, { heading: true });
      } else {
        host.innerHTML = '<div class="done"><h2>Tool not found</h2><p>We could not find that tool. Pick one from the full list.</p><a class="btn" href="/">See all tools</a></div>';
      }
    }
    if ($('tool-grid')) initHome();
    if (new URLSearchParams(window.location.search).get('selftest') === '1') setTimeout(function () { runPdfEngineSelfTests(); }, 250);
  }

  /* Optional in-browser QA runner: open the site with ?selftest=1. */
  async function runPdfEngineSelfTests() {
    await need();
    window.__PDF_ENGINE_SELFTEST_ACTIVE = true;
    window.__PDF_ENGINE_SELFTEST_OUTPUT = null;
    var report = mk('section', 'wrap');
    report.id = 'selftest-report';
    report.style.cssText = 'margin:24px auto;padding:20px;border:1px solid var(--line);border-radius:18px;background:var(--surface);';
    report.innerHTML = '<h2>Doc Writer Lab processing self-test</h2><p class="lead">Generating sample files locally in this browser and testing the actual tool processing functions.</p><p id="selftest-status" class="msg">Preparing test files…</p><div id="selftest-results"></div>';
    document.body.insertBefore(report, document.body.firstChild);
    var status = report.querySelector('#selftest-status'), results = report.querySelector('#selftest-results');
    var rows = [];
    function wait(ms) { return new Promise(function (resolve) { setTimeout(resolve, ms); }); }
    async function until(fn, label, limit) {
      var end = Date.now() + (limit || 18000);
      while (Date.now() < end) { if (fn()) return; await wait(100); }
      throw new Error('Timed out waiting for ' + label + '.');
    }
    function addResult(name, ok, detail) {
      rows.push({ name: name, ok: ok, detail: detail || '' });
      var table = '<table style="width:100%;border-collapse:collapse;margin-top:12px"><thead><tr><th style="text-align:left;padding:8px;border-bottom:1px solid var(--line)">Tool</th><th style="text-align:left;padding:8px;border-bottom:1px solid var(--line)">Result</th><th style="text-align:left;padding:8px;border-bottom:1px solid var(--line)">Details</th></tr></thead><tbody>';
      table += rows.map(function (r) { return '<tr><td style="padding:8px;border-bottom:1px solid var(--line)"></td><td style="padding:8px;border-bottom:1px solid var(--line)"></td><td style="padding:8px;border-bottom:1px solid var(--line)"></td></tr>'; }).join('');
      results.innerHTML = table + '</tbody></table>';
      Array.from(results.querySelectorAll('tbody tr')).forEach(function (tr, i) {
        tr.children[0].textContent = rows[i].name;
        tr.children[1].textContent = rows[i].ok ? 'PASS' : 'FAIL';
        tr.children[1].style.color = rows[i].ok ? 'var(--accent)' : 'var(--pdf)';
        tr.children[2].textContent = rows[i].detail;
      });
      status.textContent = rows.filter(function (r) { return r.ok; }).length + ' passed · ' + rows.filter(function (r) { return !r.ok; }).length + ' failed';
    }
    async function makePdf(pageCount, formMode) {
      var d = await PDFLib.PDFDocument.create();
      for (var i = 1; i <= pageCount; i++) {
        var p = d.addPage([595, 842]);
        p.drawText('Doc Writer Lab Sample page ' + i, { x: 40, y: 790, size: 18, font: await d.embedFont(PDFLib.StandardFonts.Helvetica) });
      }
      if (formMode) {
        var form = d.getForm(), field = form.createTextField('sampleField');
        field.setText('Test form value');
        field.addToPage(d.getPages()[0], { x: 40, y: 730, width: 220, height: 28 });
      }
      return new File([await d.save()], formMode ? 'sample-form.pdf' : 'sample-' + pageCount + '-pages.pdf', { type: 'application/pdf' });
    }
    async function makeImage() {
      var canvas = document.createElement('canvas'); canvas.width = 320; canvas.height = 180;
      var ctx = canvas.getContext('2d'); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, 320, 180);
      ctx.fillStyle = '#124a58'; ctx.font = '24px sans-serif'; ctx.fillText('Doc Writer Lab test image', 12, 90);
      var blob = await new Promise(function (resolve) { canvas.toBlob(resolve, 'image/jpeg', .9); });
      if (!blob) throw new Error('Could not create test image.');
      return new File([blob], 'sample-image.jpg', { type: 'image/jpeg' });
    }
    async function executeTest(test) {
      try {
        status.textContent = 'Testing ' + test.name + '…';
        window.__PDF_ENGINE_SELFTEST_OUTPUT = null;
        openTool(test.id);
        var body = $('tool-body');
        var input = body.querySelector('input[type="file"]');
        if (!input) throw new Error('File input did not render.');
        var dt = new DataTransfer();
        (test.files || [test.file]).forEach(function (f) { dt.items.add(f); });
        input.files = dt.files;
        input.dispatchEvent(new Event('change', { bubbles: true }));
        await until(function () { var b = body.querySelector('.row .btn'); return b && !b.disabled; }, 'file validation');
        (test.options || {}).constructor === Object && Object.keys(test.options || {}).forEach(function (key) {
          var el = body.querySelector('[data-k="' + key + '"]'); if (el) { el.value = test.options[key]; el.dispatchEvent(new Event('input', { bubbles: true })); }
        });
        var button = body.querySelector('.row .btn');
        if (!button) throw new Error('Processing button did not render.');
        button.click();
        await until(function () {
          var out = window.__PDF_ENGINE_SELFTEST_OUTPUT;
          var msg = body.querySelector('.msg');
          return !!out || !!(msg && msg.classList.contains('err'));
        }, 'processing output', 25000);
        var out = window.__PDF_ENGINE_SELFTEST_OUTPUT;
        if (!out || !out.blob || out.blob.size === 0) {
          var m = body.querySelector('.msg');
          throw new Error(m ? m.textContent : 'No output file was produced.');
        }
        var detail = out.name + ' (' + fmt(out.blob.size) + ')';
        if (test.kind === 'pdf' || (!test.kind && /\.pdf$/i.test(out.name))) {
          var check = await PDFLib.PDFDocument.load(await out.blob.arrayBuffer());
          var count = check.getPageCount();
          if (test.pages && count !== test.pages) throw new Error('Expected ' + test.pages + ' pages, got ' + count + '.');
          detail += ' · valid PDF · ' + count + ' page(s)';
          if (test.id === 'flatten' && check.getForm().getFields().length !== 0) throw new Error('Form fields remain interactive after flattening.');
        } else if (test.kind === 'zip') {
          var zip = await JSZip.loadAsync(out.blob), files = Object.keys(zip.files).filter(function (n) { return !zip.files[n].dir; });
          if (test.entries && files.length !== test.entries) throw new Error('Expected ' + test.entries + ' ZIP entries, got ' + files.length + '.');
          detail += ' · valid ZIP · ' + files.length + ' file(s)';
        } else if (test.kind === 'text') {
          var txt = await out.blob.text();
          if (test.contains && txt.indexOf(test.contains) < 0) throw new Error('Expected text was not found in output.');
          detail += ' · text output verified';
        } else if (test.kind === 'jpg') {
          var jpg = new Uint8Array(await out.blob.arrayBuffer());
          if (!(jpg[0] === 255 && jpg[1] === 216)) throw new Error('Output is not a valid JPEG stream.');
          detail += ' · JPEG signature verified';
        }
        addResult(test.name, true, detail);
      } catch (e) { addResult(test.name, false, e && e.message ? e.message : String(e)); }
    }
    try {
      var pdf3 = await makePdf(3, false), pdf1 = await makePdf(1, false), formPdf = await makePdf(1, true), img = await makeImage();
      var tests = [
        { name: 'Merge PDF', id: 'merge', files: [pdf3, pdf1], kind: 'pdf', pages: 4 },
        { name: 'Split PDF (range)', id: 'split', file: pdf3, options: { mode: 'range', range: '1-2' }, kind: 'pdf', pages: 2 },
        { name: 'Split PDF (ZIP)', id: 'split', file: pdf3, options: { mode: 'each' }, kind: 'zip', entries: 3 },
        { name: 'Rotate PDF', id: 'rotate', file: pdf3, kind: 'pdf', pages: 3 },
        { name: 'Remove Pages', id: 'remove', file: pdf3, options: { range: '2' }, kind: 'pdf', pages: 2 },
        { name: 'Add Page Numbers', id: 'number', file: pdf3, kind: 'pdf', pages: 3 },
        { name: 'PDF to JPG', id: 'pdf2jpg', file: pdf3, kind: 'zip', entries: 3 },
        { name: 'JPG to PDF', id: 'jpg2pdf', file: img, kind: 'pdf', pages: 1 },
        { name: 'Compress PDF', id: 'compress', file: pdf3, kind: 'pdf', pages: 3 },
        { name: 'Extract PDF Pages', id: 'extract', file: pdf3, options: { range: '1-2' }, kind: 'pdf', pages: 2 },
        { name: 'Reorder PDF Pages', id: 'organize', file: pdf3, options: { order: '3,1,2' }, kind: 'pdf', pages: 3 },
        { name: 'Add PDF Watermark', id: 'watermark', file: pdf3, kind: 'pdf', pages: 3 },
        { name: 'Crop PDF Pages', id: 'crop', file: pdf3, kind: 'pdf', pages: 3 },
        { name: 'PDF to Text', id: 'pdf2text', file: pdf3, kind: 'text', contains: 'Doc Writer Lab Sample page 1' },
        { name: 'Sign PDF', id: 'sign', file: pdf3, options: { sig: 'QA Test Signature' }, kind: 'pdf', pages: 3 },
        { name: 'Add Text to PDF', id: 'addtext', file: pdf3, options: { text: 'QA Test Text' }, kind: 'pdf', pages: 3 },
        { name: 'Flatten PDF Forms', id: 'flatten', file: formPdf, kind: 'pdf', pages: 1 }
      ];
      for (var i = 0; i < tests.length; i++) await executeTest(tests[i]);
    } catch (e) { addResult('Test setup', false, e && e.message ? e.message : String(e)); }
    window.__PDF_ENGINE_SELFTEST_ACTIVE = false;
    status.textContent = rows.filter(function (r) { return r.ok; }).length + '/' + rows.length + ' tests passed · ' + rows.filter(function (r) { return !r.ok; }).length + ' failed';
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
