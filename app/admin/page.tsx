"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';

/* ================= Types ================= */

type Article = {
  id: string;
  category: string;
  titleSi: string;
  subtitleEn: string;
  date: string;
  readingTime: string;
  tags: string;
  coverImage: string;
  description: string;
  body: string;
};

type Category = {
  id: string;
  icon: string;
  label: string;
  descEn: string;
  descSi: string;
};

type Shortlink = {
  code: string;
  label: string;
  subtitle: string;
  section: 'social' | 'msplan' | 'other';
  icon: string;
  url: string;
};

type AiTool = {
  code: string;
  name: string;
  subtitle: string;
  category: string;
  icon: string;
};

type SkillCategory = {
  id: string;
  icon: string;
  label: string;
  description: string;
};

type Skill = {
  slug: string;
  category: string;
  name: string;
  description: string;
  fileUrl: string;
  downloads: number;
};

type StoreData = {
  categories: Category[];
  articles: Article[];
  shortlinks: Shortlink[];
  aiTools: AiTool[];
  skillCategories: SkillCategory[];
  skills: Skill[];
};

/* ================= Constants & Seed ================= */

const STORAGE_KEY = 'portfolioAdminData';

const TOOL_CATS = [
  { value: 'chat', label: '💬 Chat' }, { value: 'code', label: '💻 Code' }, { value: 'design', label: '🎨 Design' },
  { value: 'image', label: '🖼 Image' }, { value: 'write', label: '✍ Write' }, { value: 'audio', label: '🎵 Audio' },
  { value: 'video', label: '🎬 Video' }, { value: 'search', label: '🔍 Search' }, { value: 'data', label: '📊 Data' },
  { value: 'util', label: '⚙ Utilities' }
];

const SECTIONS = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊', group: null },
  { id: 'articles', label: 'Articles', icon: '📝', group: 'Content' },
  { id: 'categories', label: 'Article Categories', icon: '🗂', group: 'Content' },
  { id: 'links', label: 'Shortlinks', icon: '🔗', group: 'Links' },
  { id: 'aitools', label: 'AI Tools', icon: '🤖', group: 'Links' },
  { id: 'skills', label: 'Skills', icon: '📦', group: 'Downloads' },
  { id: 'data', label: 'Data / Backup', icon: '💾', group: 'System' },
];

const INITIAL_SEED: StoreData = {
  categories: [
    { id: 'github', icon: '🐙', label: 'GitHub', descEn: 'Git, GitHub and open source workflows', descSi: 'GitHub සහ open source ලිපි' },
    { id: 'azure', icon: '☁️', label: 'Azure', descEn: 'Microsoft Azure cloud guides', descSi: 'Azure වලාකුළු මාර්ගෝපදේශ' },
    { id: 'aiml', icon: '🤖', label: 'AI/ML', descEn: 'AI and machine learning topics', descSi: 'AI සහ යන්ත්‍ර ඉගෙනුම් ලිපි' }
  ],
  articles: [
    {
      id: 'getting-started-github', category: 'github', titleSi: 'GitHub සමඟ ආරම්භය', subtitleEn: 'Getting started with GitHub',
      description: 'A beginner-friendly walkthrough of repos, commits and pull requests.', date: '2026-06-20', readingTime: '6 min',
      tags: 'github, git, beginner', coverImage: '', body: '## Introduction\n\nWrite your markdown here…'
    }
  ],
  shortlinks: [
    { code: 'linkedin', label: 'LinkedIn', subtitle: 'linkedin.com', section: 'social', icon: '💼', url: 'https://linkedin.com/in/your-profile' },
    { code: 'github', label: 'GitHub', subtitle: 'github.com', section: 'social', icon: '🐙', url: 'https://github.com/your-username' },
    { code: 'youtube', label: 'YouTube', subtitle: 'youtube.com', section: 'social', icon: '▶️', url: 'https://youtube.com/@your-channel' },
    { code: 'whatsapp', label: 'WhatsApp', subtitle: 'wa.me', section: 'social', icon: '💬', url: 'https://wa.me/your-number' },
    ...('ABCDEFGHIJK'.split('').map(l => ({
      code: 'msplan/' + l.toLowerCase(), label: 'MS Learn Plan ' + l, subtitle: 'learn.microsoft.com',
      section: 'msplan' as const, icon: '📘', url: 'https://learn.microsoft.com/'
    })))
  ],
  aiTools: [
    { code: 'chat/chatgpt', name: 'ChatGPT', subtitle: 'chat.openai.com', category: 'chat', icon: '💬' },
    { code: 'chat/claude', name: 'Claude', subtitle: 'claude.ai', category: 'chat', icon: '✳️' },
    { code: 'code/copilot', name: 'GitHub Copilot', subtitle: 'github.com/features/copilot', category: 'code', icon: '💻' }
  ],
  skillCategories: [
    { id: 'ai', icon: '🤖', label: 'AI Skills', description: 'Downloadable AI skill packs' }
  ],
  skills: [
    { slug: 'sample-skill', category: 'ai', name: 'Sample Skill', description: 'Example skill pack', fileUrl: 'https://example.com/skill.zip', downloads: 0 }
  ]
};

/* ================= Components ================= */

export default function AdminPage() {
  const [data, setData] = useState<StoreData>(INITIAL_SEED);
  const [activeSec, setActiveSec] = useState('dashboard');
  const [toast, setToast] = useState<{ msg: string, type: 'ok' | 'err' | '' }>({ msg: '', type: '' });
  const [modal, setModal] = useState<{ open: boolean, title: string, fields: any[], values: any, onSave: (val: any) => void }>({
    open: false, title: '', fields: [], values: {}, onSave: () => { }
  });

  // Filters
  const [artQuery, setArtQuery] = useState('');
  const [artCatFilter, setArtCatFilter] = useState('');
  const [linkQuery, setLinkQuery] = useState('');
  const [linkSecFilter, setLinkSecFilter] = useState('');
  const [toolQuery, setToolQuery] = useState('');
  const [toolCatFilter, setToolCatFilter] = useState('');
  const [skillQuery, setSkillQuery] = useState('');
  const [skillCatFilter, setSkillCatFilter] = useState('');

  // Persist to localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure all keys exist
        const merged = { ...INITIAL_SEED, ...parsed };
        setData(merged);
      } catch (e) {
        setData(INITIAL_SEED);
      }
    }
  }, []);

  const saveData = (newData: StoreData, notify = true) => {
    setData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    if (notify) showToast('Saved ✔');
  };

  const showToast = (msg: string, type: 'ok' | 'err' = 'ok') => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: '', type: '' }), 2400);
  };

  /* --- Navigation --- */
  const navItems = useMemo(() => {
    const items: React.ReactNode[] = [];
    let lastGroup: string | null = null;
    SECTIONS.forEach(s => {
      if (s.group !== lastGroup) {
        items.push(<div key={`sep-${s.group}`} className="admin-nav-sep">{s.group}</div>);
        lastGroup = s.group;
      }
      items.push(
        <button
          key={s.id}
          className={`admin-nav-item ${activeSec === s.id ? 'active' : ''}`}
          onClick={() => setActiveSec(s.id)}
        >
          <span className="ico">{s.icon}</span>
          <span className="txt">{s.label}</span>
        </button>
      );
    });
    return items;
  }, [activeSec]);

  /* --- Handlers --- */
  const openModal = (title: string, fields: any[], values: any, onSave: (val: any) => void) => {
    setModal({ open: true, title, fields, values, onSave });
  };

  const closeModal = () => setModal({ ...modal, open: false });

  const handleModalSave = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const obj: any = {};
    modal.fields.forEach(f => {
      obj[f.key] = formData.get(f.key);
    });
    modal.onSave(obj);
    closeModal();
  };

  /* ================= Render Sections ================= */

  const renderDashboard = () => {
    const stats = [
      { ico: '📝', num: data.articles.length, lbl: 'Articles', sec: 'articles' },
      { ico: '🗂', num: data.categories.length, lbl: 'Article Categories', sec: 'categories' },
      { ico: '🔗', num: data.shortlinks.length, lbl: 'Shortlinks', sec: 'links' },
      { ico: '🤖', num: data.aiTools.length, lbl: 'AI Tools', sec: 'aitools' },
      { ico: '📦', num: data.skills.length, lbl: 'Skills', sec: 'skills' },
      { ico: '⬇', num: data.skills.reduce((a, s) => a + (Number(s.downloads) || 0), 0), lbl: 'Total Downloads', sec: 'skills' }
    ];

    const recentArticles = [...data.articles]
      .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
      .slice(0, 5);

    const topSkills = [...data.skills]
      .sort((a, b) => (Number(b.downloads) || 0) - (Number(a.downloads) || 0))
      .slice(0, 5);

    return (
      <section>
        <div className="admin-page-head">
          <div><h1>Dashboard</h1><p>Overview of everything on your portfolio.</p></div>
        </div>
        <div className="admin-stats">
          {stats.map(s => (
            <div key={s.lbl} className="admin-stat" onClick={() => setActiveSec(s.sec)}>
              <div className="ico">{s.ico}</div>
              <div className="num">{s.num}</div>
              <div className="lbl">{s.lbl}</div>
            </div>
          ))}
        </div>
        <div className="admin-grid-2">
          <div className="admin-card">
            <div className="admin-card-head">
              <h2>🕒 Recent Articles</h2>
              <button className="admin-btn sm primary" onClick={() => openArticleForm()}>+ New</button>
            </div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <tbody>
                  {recentArticles.length ? recentArticles.map(a => (
                    <tr key={a.id}>
                      <td>
                        <div className="admin-cell-main">{a.titleSi}</div>
                        <div className="admin-cell-sub">{a.subtitleEn}</div>
                      </td>
                      <td style={{ textAlign: 'right' }} className="admin-cell-sub">{a.date}</td>
                    </tr>
                  )) : <tr><td className="admin-empty">No articles yet</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
          <div className="admin-card">
            <div className="admin-card-head">
              <h2>⬇ Top Skill Downloads</h2>
              <button className="admin-btn sm primary" onClick={() => openSkillForm()}>+ New</button>
            </div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <tbody>
                  {topSkills.length ? topSkills.map(s => (
                    <tr key={s.slug}>
                      <td>
                        <div className="admin-cell-main">{s.name}</div>
                        <div className="admin-cell-sub">{s.slug}</div>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <span className="admin-badge green">⬇ {s.downloads}</span>
                      </td>
                    </tr>
                  )) : <tr><td className="admin-empty">No skills yet</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    );
  };

  /* --- Articles Logic --- */
  const openArticleForm = (id?: string) => {
    const item = data.articles.find(a => a.id === id);
    const catOptions = data.categories.map(c => ({ value: c.id, label: `${c.icon} ${c.label}` }));
    if (!catOptions.length) return showToast('Create a category first', 'err');

    const fields = [
      { key: 'id', label: 'Slug / ID', required: true, placeholder: 'my-article-slug', hint: 'Used in URL: /article/[category]/[id]' },
      { key: 'category', label: 'Category', type: 'select', required: true, options: catOptions },
      { key: 'titleSi', label: 'Title (Sinhala)', required: true, full: true, placeholder: 'සිංහල මාතෘකාව' },
      { key: 'subtitleEn', label: 'Subtitle (English)', full: true, placeholder: 'English subtitle' },
      { key: 'date', label: 'Date', type: 'date', required: true },
      { key: 'readingTime', label: 'Reading time', placeholder: '6 min' },
      { key: 'tags', label: 'Tags', full: true, placeholder: 'comma, separated, tags' },
      { key: 'coverImage', label: 'Cover image URL', full: true, placeholder: 'https://… (optional)' },
      { key: 'description', label: 'Description (callout box)', type: 'textarea', full: true },
      { key: 'body', label: 'Body (Markdown)', type: 'textarea', full: true, placeholder: '## Heading\n\nContent…' }
    ];

    openModal(item ? 'Edit Article' : 'New Article', fields, item || { date: new Date().toISOString().split('T')[0] }, (val) => {
      val.id = val.id.toLowerCase().replace(/\s+/g, '-');
      const dup = data.articles.find(a => a.id === val.id && a !== item);
      if (dup) { showToast('Slug already exists', 'err'); return; }

      const newArticles = item 
        ? data.articles.map(a => a.id === item.id ? { ...a, ...val } : a)
        : [...data.articles, val];
      saveData({ ...data, articles: newArticles });
    });
  };

  const removeArticle = (id: string) => {
    if (!confirm('Delete this article?')) return;
    saveData({ ...data, articles: data.articles.filter(a => a.id !== id) });
    showToast('Deleted');
  };

  const filteredArticles = useMemo(() => {
    return data.articles
      .filter(a => (!artCatFilter || a.category === artCatFilter) && (!artQuery || (a.titleSi + ' ' + a.subtitleEn + ' ' + a.tags).toLowerCase().includes(artQuery.toLowerCase())))
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [data.articles, artQuery, artCatFilter]);

  /* --- Category Logic --- */
  const openCategoryForm = (id?: string) => {
    const item = data.categories.find(c => c.id === id);
    const fields = [
      { key: 'id', label: 'ID', required: true, placeholder: 'github', readonly: !!item, hint: 'Used in URL: /article/[category]' },
      { key: 'icon', label: 'Icon (emoji)', required: true, placeholder: '🐙' },
      { key: 'label', label: 'Label', required: true, full: true, placeholder: 'GitHub' },
      { key: 'descEn', label: 'Description (English)', full: true },
      { key: 'descSi', label: 'Description (Sinhala)', full: true, placeholder: 'සිංහල විස්තරය' }
    ];
    openModal(item ? 'Edit Category' : 'New Category', fields, item, (val) => {
      val.id = val.id.toLowerCase().replace(/\s+/g, '-');
      const dup = data.categories.find(c => c.id === val.id && c !== item);
      if (dup) { showToast('ID already exists', 'err'); return; }

      const newCats = item
        ? data.categories.map(c => c.id === item.id ? { ...c, ...val } : c)
        : [...data.categories, val];
      saveData({ ...data, categories: newCats });
    });
  };

  const removeCategory = (id: string) => {
    const count = data.articles.filter(a => a.category === id).length;
    if (!confirm(count ? `This category has ${count} articles. Delete category AND its articles?` : 'Delete this category?')) return;
    saveData({
      ...data,
      categories: data.categories.filter(c => c.id !== id),
      articles: data.articles.filter(a => a.category !== id)
    });
    showToast('Deleted');
  };

  /* --- Shortlink Logic --- */
  const openLinkForm = (code?: string) => {
    const item = data.shortlinks.find(l => l.code === code);
    const fields = [
      { key: 'code', label: 'Code', required: true, placeholder: 'linkedin', hint: 'URL: /link/[code]' },
      { key: 'section', label: 'Section', type: 'select', required: true, options: [
        { value: 'social', label: 'Social' }, { value: 'msplan', label: 'MS Learn Plan' }, { value: 'other', label: 'Other' }]
      },
      { key: 'label', label: 'Label', required: true, placeholder: 'LinkedIn' },
      { key: 'icon', label: 'Icon (emoji)', placeholder: '💼' },
      { key: 'subtitle', label: 'Subtitle / domain', full: true, placeholder: 'linkedin.com' },
      { key: 'url', label: 'Destination URL', type: 'url', required: true, full: true, placeholder: 'https://…' }
    ];
    openModal(item ? 'Edit Shortlink' : 'New Shortlink', fields, item, (val) => {
      val.code = val.code.toLowerCase().replace(/\s+/g, '-');
      const dup = data.shortlinks.find(l => l.code === val.code && l !== item);
      if (dup) { showToast('Code already exists', 'err'); return; }

      const newLinks = item
        ? data.shortlinks.map(l => l.code === item.code ? { ...l, ...val } : l)
        : [...data.shortlinks, val];
      saveData({ ...data, shortlinks: newLinks });
    });
  };

  const removeLink = (code: string) => {
    if (!confirm('Delete this shortlink?')) return;
    saveData({ ...data, shortlinks: data.shortlinks.filter(l => l.code !== code) });
    showToast('Deleted');
  };

  const filteredLinks = useMemo(() => {
    return data.shortlinks.filter(l => (!linkSecFilter || l.section === linkSecFilter) && (!linkQuery || (l.code + ' ' + l.label + ' ' + l.url).toLowerCase().includes(linkQuery.toLowerCase())));
  }, [data.shortlinks, linkQuery, linkSecFilter]);

  /* --- AI Tools Logic --- */
  const openToolForm = (code?: string) => {
    const item = data.aiTools.find(t => t.code === code);
    const fields = [
      { key: 'code', label: 'Code', required: true, placeholder: 'chat/chatgpt' },
      { key: 'category', label: 'Category', type: 'select', required: true, options: TOOL_CATS },
      { key: 'name', label: 'Name', required: true, placeholder: 'ChatGPT' },
      { key: 'icon', label: 'Icon (emoji)', placeholder: '💬' },
      { key: 'subtitle', label: 'Subtitle / domain', full: true, placeholder: 'chat.openai.com' }
    ];
    openModal(item ? 'Edit AI Tool' : 'New AI Tool', fields, item, (val) => {
      val.code = val.code.toLowerCase().replace(/\s+/g, '-');
      const dup = data.aiTools.find(t => t.code === val.code && t !== item);
      if (dup) { showToast('Code already exists', 'err'); return; }

      const newTools = item
        ? data.aiTools.map(t => t.code === item.code ? { ...t, ...val } : t)
        : [...data.aiTools, val];
      saveData({ ...data, aiTools: newTools });
    });
  };

  const removeTool = (code: string) => {
    if (!confirm('Delete this tool?')) return;
    saveData({ ...data, aiTools: data.aiTools.filter(t => t.code !== code) });
    showToast('Deleted');
  };

  const filteredTools = useMemo(() => {
    return data.aiTools.filter(t => (!toolCatFilter || t.category === toolCatFilter) && (!toolQuery || (t.name + ' ' + t.code).toLowerCase().includes(toolQuery.toLowerCase())));
  }, [data.aiTools, toolQuery, toolCatFilter]);

  /* --- Skills Logic --- */
  const openSkillCatForm = (id?: string) => {
    const item = data.skillCategories.find(c => c.id === id);
    const fields = [
      { key: 'id', label: 'ID', required: true, placeholder: 'ai', readonly: !!item },
      { key: 'icon', label: 'Icon (emoji)', placeholder: '🤖' },
      { key: 'label', label: 'Label', required: true, full: true, placeholder: 'AI Skills' },
      { key: 'description', label: 'Description', type: 'textarea', full: true }
    ];
    openModal(item ? 'Edit Category' : 'New Category', fields, item, (val) => {
      val.id = val.id.toLowerCase().replace(/\s+/g, '-');
      const dup = data.skillCategories.find(c => c.id === val.id && c !== item);
      if (dup) { showToast('ID already exists', 'err'); return; }

      const newCats = item
        ? data.skillCategories.map(c => c.id === item.id ? { ...c, ...val } : c)
        : [...data.skillCategories, val];
      saveData({ ...data, skillCategories: newCats });
    });
  };

  const removeSkillCat = (id: string) => {
    const count = data.skills.filter(s => s.category === id).length;
    if (!confirm(count ? `This category has ${count} skills. Delete category AND its skills?` : 'Delete this category?')) return;
    saveData({
      ...data,
      skillCategories: data.skillCategories.filter(c => c.id !== id),
      skills: data.skills.filter(s => s.category !== id)
    });
    showToast('Deleted');
  };

  const openSkillForm = (slug?: string) => {
    const item = data.skills.find(s => s.slug === slug);
    const catOptions = data.skillCategories.map(c => ({ value: c.id, label: `${c.icon || '📦'} ${c.label}` }));
    if (!catOptions.length) return showToast('Create a skill category first', 'err');

    const fields = [
      { key: 'slug', label: 'Slug', required: true, placeholder: 'my-skill' },
      { key: 'category', label: 'Category', type: 'select', required: true, options: catOptions },
      { key: 'name', label: 'Name', required: true, full: true, placeholder: 'My Skill Pack' },
      { key: 'description', label: 'Description', type: 'textarea', full: true },
      { key: 'fileUrl', label: 'File URL', type: 'url', required: true, full: true, placeholder: 'https://…' },
      { key: 'downloads', label: 'Downloads', type: 'number', default: 0 }
    ];

    openModal(item ? 'Edit Skill' : 'New Skill', fields, item || { downloads: 0 }, (val) => {
      val.slug = val.slug.toLowerCase().replace(/\s+/g, '-');
      val.downloads = Number(val.downloads) || 0;
      const dup = data.skills.find(s => s.slug === val.slug && s !== item);
      if (dup) { showToast('Slug already exists', 'err'); return; }

      const newSkills = item
        ? data.skills.map(s => s.slug === item.slug ? { ...s, ...val } : s)
        : [...data.skills, val];
      saveData({ ...data, skills: newSkills });
    });
  };

  const removeSkill = (slug: string) => {
    if (!confirm('Delete this skill?')) return;
    saveData({ ...data, skills: data.skills.filter(s => s.slug !== slug) });
    showToast('Deleted');
  };

  const filteredSkills = useMemo(() => {
    return data.skills.filter(s => (!skillCatFilter || s.category === skillCatFilter) && (!skillQuery || (s.name + ' ' + s.slug).toLowerCase().includes(skillQuery.toLowerCase())));
  }, [data.skills, skillQuery, skillCatFilter]);

  /* --- Data Logic --- */
  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-data-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Exported ✔');
  };

  const importJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string);
        saveData({ ...INITIAL_SEED, ...parsed }, false);
        showToast('Imported ✔');
      } catch (err) {
        showToast('Invalid JSON', 'err');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const resetData = () => {
    if (!confirm('Restore sample data? Current changes will be lost.')) return;
    saveData(INITIAL_SEED);
  };

  const clearData = () => {
    if (!confirm('Wipe everything? This cannot be undone.')) return;
    saveData({ categories: [], articles: [], shortlinks: [], aiTools: [], skillCategories: [], skills: [] });
  };

  /* ================= Main UI ================= */

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-brand"><div className="logo">✦</div><span>Portfolio Admin</span></div>
        {navItems}
        <div className="admin-sidebar-foot">v1.1 · local data</div>
      </aside>

      {/* Main content */}
      <main className="admin-main">
        {activeSec === 'dashboard' && renderDashboard()}

        {activeSec === 'articles' && (
          <section>
            <div className="admin-page-head">
              <div><h1>Articles</h1><p>Manage articles shown on /article and category pages.</p></div>
              <div className="admin-head-actions"><button className="admin-btn primary" onClick={() => openArticleForm()}>+ New Article</button></div>
            </div>
            <div className="admin-card">
              <div className="admin-card-head">
                <div className="admin-toolbar">
                  <input className="admin-search" placeholder="Search title, tags…" value={artQuery} onChange={e => setArtQuery(e.target.value)} />
                  <select className="admin-filter-sel" value={artCatFilter} onChange={e => setArtCatFilter(e.target.value)}>
                    <option value="">All categories</option>
                    {data.categories.map(c => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
                  </select>
                </div>
              </div>
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead><tr><th>Article</th><th>Category</th><th>Date</th><th>Tags</th><th style={{ textAlign: 'right' }}>Actions</th></tr></thead>
                  <tbody>
                    {filteredArticles.length ? filteredArticles.map(a => {
                      const cat = data.categories.find(c => c.id === a.category) || { icon: '❓', label: a.category };
                      return (
                        <tr key={a.id}>
                          <td><div className="admin-cell-main">{a.titleSi}</div><div className="admin-cell-sub">{a.subtitleEn} · /article/{a.category}/{a.id}</div></td>
                          <td><span className="admin-badge">{cat.icon} {cat.label}</span></td>
                          <td><div>{a.date || '—'}</div><div className="admin-cell-sub">{a.readingTime}</div></td>
                          <td>{(a.tags || '').split(',').map(t => t.trim()).filter(Boolean).map(t => <span key={t} className="admin-tag">{t}</span>) || '—'}</td>
                          <td>
                            <div className="admin-row-actions">
                              <button className="admin-btn sm" onClick={() => openArticleForm(a.id)}>✏️</button>
                              <button className="admin-btn sm danger" onClick={() => removeArticle(a.id)}>🗑</button>
                            </div>
                          </td>
                        </tr>
                      );
                    }) : <tr><td colSpan={5} className="admin-empty">No articles found</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {activeSec === 'categories' && (
          <section>
            <div className="admin-page-head">
              <div><h1>Article Categories</h1><p>Manage categories for your blog.</p></div>
              <div className="admin-head-actions"><button className="admin-btn primary" onClick={() => openCategoryForm()}>+ New Category</button></div>
            </div>
            <div className="admin-card">
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead><tr><th></th><th>Category</th><th>Descriptions</th><th>Count</th><th style={{ textAlign: 'right' }}>Actions</th></tr></thead>
                  <tbody>
                    {data.categories.length ? data.categories.map(c => {
                      const count = data.articles.filter(a => a.category === c.id).length;
                      return (
                        <tr key={c.id}>
                          <td style={{ width: '52px' }}><div className="admin-icon-badge">{c.icon}</div></td>
                          <td><div className="admin-cell-main">{c.label}</div><div className="admin-cell-sub">/article/{c.id}</div></td>
                          <td><div>{c.descEn || '—'}</div><div className="admin-cell-sub">{c.descSi}</div></td>
                          <td><span className="admin-badge gray">{count} articles</span></td>
                          <td>
                            <div className="admin-row-actions">
                              <button className="admin-btn sm" onClick={() => openCategoryForm(c.id)}>✏️</button>
                              <button className="admin-btn sm danger" onClick={() => removeCategory(c.id)}>🗑</button>
                            </div>
                          </td>
                        </tr>
                      );
                    }) : <tr><td colSpan={5} className="admin-empty">No categories yet</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {activeSec === 'links' && (
          <section>
            <div className="admin-page-head">
              <div><h1>Shortlinks</h1><p>Redirect links at /link/[code].</p></div>
              <div className="admin-head-actions"><button className="admin-btn primary" onClick={() => openLinkForm()}>+ New Shortlink</button></div>
            </div>
            <div className="admin-card">
              <div className="admin-card-head">
                <div className="admin-toolbar">
                  <input className="admin-search" placeholder="Search code, label…" value={linkQuery} onChange={e => setLinkQuery(e.target.value)} />
                  <select className="admin-filter-sel" value={linkSecFilter} onChange={e => setLinkSecFilter(e.target.value)}>
                    <option value="">All sections</option>
                    <option value="social">Social</option>
                    <option value="msplan">Microsoft Learn Plan</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead><tr><th></th><th>Link</th><th>Section</th><th>Destination</th><th style={{ textAlign: 'right' }}>Actions</th></tr></thead>
                  <tbody>
                    {filteredLinks.length ? filteredLinks.map(l => (
                      <tr key={l.code}>
                        <td style={{ width: '52px' }}><div className="admin-icon-badge">{l.icon || '🔗'}</div></td>
                        <td><div className="admin-cell-main">{l.label}</div><div className="admin-cell-sub">/link/{l.code}</div></td>
                        <td><span className={`admin-badge ${l.section === 'social' ? '' : l.section === 'msplan' ? 'green' : 'gray'}`}>{l.section}</span></td>
                        <td><a href={l.url} target="_blank" rel="noreferrer" style={{ color: 'var(--admin-accent)', textDecoration: 'none' }}>{l.url.length > 40 ? l.url.slice(0, 40) + '...' : l.url}</a></td>
                        <td>
                          <div className="admin-row-actions">
                            <button className="admin-btn sm" onClick={() => openLinkForm(l.code)}>✏️</button>
                            <button className="admin-btn sm danger" onClick={() => removeLink(l.code)}>🗑</button>
                          </div>
                        </td>
                      </tr>
                    )) : <tr><td colSpan={5} className="admin-empty">No shortlinks found</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {activeSec === 'aitools' && (
          <section>
            <div className="admin-page-head">
              <div><h1>AI Tools</h1><p>Tools shown on /link/ai.</p></div>
              <div className="admin-head-actions"><button className="admin-btn primary" onClick={() => openToolForm()}>+ New Tool</button></div>
            </div>
            <div className="admin-card">
              <div className="admin-card-head">
                <div className="admin-toolbar">
                  <input className="admin-search" placeholder="Search tool..." value={toolQuery} onChange={e => setToolQuery(e.target.value)} />
                  <select className="admin-filter-sel" value={toolCatFilter} onChange={e => setToolCatFilter(e.target.value)}>
                    <option value="">All categories</option>
                    {TOOL_CATS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </div>
              </div>
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead><tr><th></th><th>Tool</th><th>Category</th><th>Subtitle</th><th style={{ textAlign: 'right' }}>Actions</th></tr></thead>
                  <tbody>
                    {filteredTools.length ? filteredTools.map(t => (
                      <tr key={t.code}>
                        <td style={{ width: '52px' }}><div className="admin-icon-badge">{t.icon || '🤖'}</div></td>
                        <td><div className="admin-cell-main">{t.name}</div><div className="admin-cell-sub">/link/{t.code}</div></td>
                        <td><span className="admin-badge">{TOOL_CATS.find(c => c.value === t.category)?.label || t.category}</span></td>
                        <td className="admin-cell-sub">{t.subtitle}</td>
                        <td>
                          <div className="admin-row-actions">
                            <button className="admin-btn sm" onClick={() => openToolForm(t.code)}>✏️</button>
                            <button className="admin-btn sm danger" onClick={() => removeTool(t.code)}>🗑</button>
                          </div>
                        </td>
                      </tr>
                    )) : <tr><td colSpan={5} className="admin-empty">No tools found</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {activeSec === 'skills' && (
          <section>
            <div className="admin-page-head">
              <div><h1>Skill Downloads</h1><p>Manage skills at /download/[category]/skill/[slug].</p></div>
              <div className="admin-head-actions">
                <button className="admin-btn" style={{ marginRight: '8px' }} onClick={() => openSkillCatForm()}>+ New Category</button>
                <button className="admin-btn primary" onClick={() => openSkillForm()}>+ New Skill</button>
              </div>
            </div>
            <div className="admin-card">
              <div className="admin-card-head"><h2>Categories</h2></div>
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead><tr><th></th><th>Category</th><th>Description</th><th>Count</th><th style={{ textAlign: 'right' }}>Actions</th></tr></thead>
                  <tbody>
                    {data.skillCategories.map(c => (
                      <tr key={c.id}>
                        <td style={{ width: '52px' }}><div className="admin-icon-badge">{c.icon || '📦'}</div></td>
                        <td><div className="admin-cell-main">{c.label}</div><div className="admin-cell-sub">/download/{c.id}/skill</div></td>
                        <td className="admin-cell-sub">{c.description}</td>
                        <td><span className="admin-badge gray">{data.skills.filter(s => s.category === c.id).length} skills</span></td>
                        <td>
                          <div className="admin-row-actions">
                            <button className="admin-btn sm" onClick={() => openSkillCatForm(c.id)}>✏️</button>
                            <button className="admin-btn sm danger" onClick={() => removeSkillCat(c.id)}>🗑</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="admin-card">
              <div className="admin-card-head">
                <div className="admin-toolbar">
                  <input className="admin-search" placeholder="Search skills..." value={skillQuery} onChange={e => setSkillQuery(e.target.value)} />
                  <select className="admin-filter-sel" value={skillCatFilter} onChange={e => setSkillCatFilter(e.target.value)}>
                    <option value="">All categories</option>
                    {data.skillCategories.map(c => <option key={c.id} value={c.id}>{c.icon || '📦'} {c.label}</option>)}
                  </select>
                </div>
              </div>
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead><tr><th>Skill</th><th>Category</th><th>File</th><th>Downloads</th><th style={{ textAlign: 'right' }}>Actions</th></tr></thead>
                  <tbody>
                    {filteredSkills.map(s => {
                      const cat = data.skillCategories.find(c => c.id === s.category) || { icon: '❓', label: s.category };
                      return (
                        <tr key={s.slug}>
                          <td><div className="admin-cell-main">{s.name}</div><div className="admin-cell-sub">/download/{s.category}/skill/{s.slug}</div></td>
                          <td><span className="admin-badge">{cat.icon} {cat.label}</span></td>
                          <td><a href={s.fileUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--admin-accent)', textDecoration: 'none' }}>{s.fileUrl.length > 30 ? s.fileUrl.slice(0, 30) + '...' : s.fileUrl}</a></td>
                          <td><span className="admin-badge green">⬇ {s.downloads}</span></td>
                          <td>
                            <div className="admin-row-actions">
                              <button className="admin-btn sm" onClick={() => openSkillForm(s.slug)}>✏️</button>
                              <button className="admin-btn sm danger" onClick={() => removeSkill(s.slug)}>🗑</button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {activeSec === 'data' && (
          <section>
            <div className="admin-page-head">
              <div><h1>Data & Backup</h1><p>Export or import your portfolio data as JSON.</p></div>
            </div>
            <div className="admin-card">
              <div className="admin-card-body" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button className="admin-btn primary" onClick={exportJSON}>⬇ Export all data (JSON)</button>
                <label className="admin-btn" style={{ cursor: 'pointer' }}>
                  ⬆ Import JSON
                  <input type="file" accept=".json" style={{ display: 'none' }} onChange={importJSON} />
                </label>
                <button className="admin-btn" onClick={resetData}>↺ Restore sample data</button>
                <button className="admin-btn danger" onClick={clearData}>🗑 Clear everything</button>
              </div>
            </div>
            <div className="admin-card">
              <div className="admin-card-head"><h2>Live data preview</h2></div>
              <div className="admin-card-body">
                <pre style={{ fontSize: '12px', overflow: 'auto', maxHeight: '420px', color: '#475569', margin: 0 }}>
                  {JSON.stringify(data, null, 2)}
                </pre>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Modal Overlay */}
      {modal.open && (
        <div className="admin-modal-overlay" onClick={e => e.target === e.currentTarget && closeModal()}>
          <div className="admin-modal">
            <div className="admin-modal-head">
              <h3>{modal.title}</h3>
              <button className="admin-modal-x" onClick={closeModal}>✕</button>
            </div>
            <form onSubmit={handleModalSave}>
              <div className="admin-modal-body">
                {modal.fields.map(f => (
                  <div key={f.key} className={`admin-field ${f.full ? 'full' : ''}`}>
                    <label>{f.label} {f.required && <span className="req">*</span>}</label>
                    {f.type === 'textarea' ? (
                      <textarea name={f.key} required={f.required} defaultValue={modal.values?.[f.key] || f.default || ''} placeholder={f.placeholder} />
                    ) : f.type === 'select' ? (
                      <select name={f.key} required={f.required} defaultValue={modal.values?.[f.key] || f.default || ''}>
                        {f.options.map((o: any) => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    ) : (
                      <input 
                        name={f.key} 
                        type={f.type || 'text'} 
                        required={f.required} 
                        readOnly={f.readonly}
                        style={f.readonly ? { background: '#f8fafc', color: '#94a3b8' } : {}}
                        defaultValue={modal.values?.[f.key] || f.default || ''} 
                        placeholder={f.placeholder} 
                      />
                    )}
                    {f.hint && <div className="hint">{f.hint}</div>}
                  </div>
                ))}
              </div>
              <div className="admin-modal-foot">
                <button type="button" className="admin-btn" onClick={closeModal}>Cancel</button>
                <button type="submit" className="admin-btn primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <div className={`admin-toast ${toast.msg ? 'show' : ''} ${toast.type}`}>
        {toast.msg}
      </div>
    </div>
  );
}
