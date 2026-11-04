document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.js-load-video').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var container = trigger.closest('.js-video-container');
      if (!container || container.dataset.loaded === 'true' || !container.dataset.videoSrc) return;
      var video = document.createElement('video');
      video.controls = true;
      video.preload = 'metadata';
      video.playsInline = true;
      video.setAttribute('aria-label', container.dataset.videoTitle + '演示视频');
      var source = document.createElement('source');
      source.src = container.dataset.videoSrc;
      source.type = 'video/mp4';
      video.appendChild(source);
      var fallback = document.createElement('a');
      fallback.href = container.dataset.videoSrc;
      fallback.textContent = '下载演示视频';
      video.appendChild(fallback);
      trigger.replaceWith(video);
      container.dataset.loaded = 'true';
      video.tabIndex = 0;
      video.focus();
    });
  });
});
