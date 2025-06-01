document.addEventListener('DOMContentLoaded', () => {
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
});