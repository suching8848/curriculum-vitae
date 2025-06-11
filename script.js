// 深色模式持久化
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// 雷达图初始化
function initSkillRadar() {
    const ctx = document.getElementById('skill-radar').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js'],
            datasets: [{
                data: [95, 90, 85, 80, 75],
                backgroundColor: 'rgba(52, 152, 219, 0.2)'
            }]
        }
    });
}

// 主题切换功能
// 增强版主题切换逻辑
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  
  // 增加元素存在性检查
  if (!themeToggle) {
    console.error('未找到主题切换按钮');
    return;
  }

  // 增强本地存储读取
  const savedTheme = localStorage.getItem('theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const currentTheme = savedTheme || (systemDark ? 'dark' : 'light');

  // 应用初始主题
  document.body.classList.toggle('dark-mode', currentTheme === 'dark');
  themeToggle.innerHTML = currentTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';

  // 使用事件委托防止动态加载问题
  document.body.addEventListener('click', (e) => {
    if (e.target.closest('#theme-toggle')) {
      document.body.classList.toggle('dark-mode');
      const isDarkMode = document.body.classList.contains('dark-mode');
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
      themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
  });
  // 在点击事件中添加调试输出
  themeToggle.addEventListener('click', () => {
    console.log('按钮点击事件触发');
    console.log('当前黑暗模式状态：', document.body.classList.contains('dark-mode'));
  });
}

// 使用更可靠的事件监听方式
document.addEventListener('DOMContentLoaded', initTheme);
window.addEventListener('load', initTheme);
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSkillRadar();
});

// 动态加载技能条
const skills = document.querySelectorAll('.skill');
// 修改原有技能条初始化逻辑
skills.forEach(skill => {
    const level = skill.dataset.level;
    const bar = skill.querySelector('.bar');
    const hue = (120 * level) / 100; // 根据技能等级计算色相（0-120）
    bar.style.width = `${level}%`;
    bar.style.background = `hsl(${hue}, 80%, 50%)`; // 动态设置HSL颜色
});

// 时间轴动画
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
    }, index * 200);
});

// 悬停效果
document.querySelectorAll('.timeline-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px)';
    });
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
    });
});
// 在原有JS基础上新增项目卡片动画
document.querySelectorAll('.project-card').forEach((card, index) => {
    setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, index * 150);
});
// 初始化Swiper
const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    effect: 'coverflow', // 卡片3D效果
    coverflowEffect: {
        rotate: 30,
        slideShadows: false
    }
});

// 移动端导航切换
// 导航栏响应式菜单
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// 点击链接后收起菜单（可选）
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
            navLinks.classList.remove('active');
        }
    });
});

// 滚动高亮导航项
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const top = section.offsetTop - 100;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollY >= top && scrollY < bottom) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// 平滑滚动
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// 增加强制重绘逻辑
function forceReflow(element) {
  element.offsetHeight;
}

// 修改后的切换逻辑
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  forceReflow(document.body);
  // 更新其他需要动态变化的元素
  document.querySelectorAll('.nav, .header').forEach(el => {
    el.style.display = 'none';
    el.style.display = '';
  });
});

// 添加立即执行
window.dispatchEvent(new Event('scroll'));

// 修改滚动监听为
window.addEventListener('scroll', () => {
    const showHeight = 200;
    const currentOpacity = window.scrollY > showHeight ? 1 : 0.5;
    backToTop.style.opacity = currentOpacity;
    console.log('按钮元素尺寸：', backToTop.offsetWidth, backToTop.offsetHeight);
    console.log('窗口滚动位置：', window.scrollY);
});

// 返回顶部功能
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM加载完成');
    const backToTop = document.getElementById('backToTop');
  
    if (backToTop) {
      console.log('找到返回按钮元素');
      backToTop.classList.remove('show');
  
      // scroll 事件监听器中重新使用变量时作用域错误
      window.addEventListener('scroll', () => {
        requestAnimationFrame(() => {
          console.log('当前滚动位置:', window.scrollY);
          backToTop.classList.toggle('show', window.scrollY > 200);
        });
      });
  
      backToTop.addEventListener('click', (e) => {
        console.log('点击返回顶部按钮');
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    } else {
      console.error('返回顶部按钮元素未找到');
    }
  });
  
// 雷达图初始化
function initSkillRadar() {
  const radarCanvas = document.getElementById('skill-radar');
  if (!radarCanvas) return;
  
  const ctx = radarCanvas.getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js'],
            datasets: [{
                data: [95, 90, 85, 80, 75],
                backgroundColor: 'rgba(52, 152, 219, 0.2)'
            }]
        }
    });
}
