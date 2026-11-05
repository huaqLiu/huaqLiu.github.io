(function () {
  'use strict';

  var storageKey = 'academic-theme';
  var root = document.documentElement;
  var systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  var preference = null;

  function readPreference() {
    try {
      var saved = window.localStorage.getItem(storageKey);
      return saved === 'light' || saved === 'dark' ? saved : null;
    } catch (error) {
      return null;
    }
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    var themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.content = theme === 'dark' ? '#191e24' : '#ffffff';

    var button = document.getElementById('theme-toggle');
    if (!button) return;
    var isDark = theme === 'dark';
    var label = isDark ? '切换到浅色模式' : '切换到深色模式';
    button.setAttribute('aria-label', label);
    button.setAttribute('aria-pressed', String(isDark));
    button.title = label;
    button.querySelector('.theme-toggle-label').textContent = isDark ? '浅色' : '深色';
  }

  function resolveTheme() {
    return preference || (systemTheme.matches ? 'dark' : 'light');
  }

  preference = readPreference();
  applyTheme(resolveTheme());

  document.addEventListener('DOMContentLoaded', function () {
    var button = document.getElementById('theme-toggle');
    if (!button) return;
    applyTheme(resolveTheme());
    button.hidden = false;
    button.addEventListener('click', function () {
      preference = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      try {
        window.localStorage.setItem(storageKey, preference);
      } catch (error) {
        // The toggle still works when the browser blocks storage.
      }
      applyTheme(preference);
    });
  });

  function onSystemThemeChange() {
    if (!preference) applyTheme(resolveTheme());
  }
  if (systemTheme.addEventListener) {
    systemTheme.addEventListener('change', onSystemThemeChange);
  } else {
    systemTheme.addListener(onSystemThemeChange);
  }

  window.addEventListener('storage', function (event) {
    if (event.key !== storageKey && event.key !== null) return;
    preference = readPreference();
    applyTheme(resolveTheme());
  });
}());
