(function () {
    const GUILD_ID = '1243540737296175164';
    const WIDGET_API = `https://discord.com/api/guilds/${GUILD_ID}/widget.json`;
    const DISCORD_INVITE = 'https://discord.gg/Yxt2GYd2VM';
    const REFRESH_INTERVAL = 30000;

    const widget = document.getElementById('discord-widget');

    if (!widget) return;

    function renderLoading() {
        widget.innerHTML =
            '<div class="discord-widget-loading" style="color:#ffffff;"><div class="spinner"></div>Loading community...</div>';
    }

    function renderError() {
        widget.innerHTML =
            '<div class="discord-widget-error" style="color:#ff6b6b;">Unable to load Discord community data. Please try again later.</div>';
    }

    function render(data) {
        if (!data || data.code === 10004) {
            renderError();
            return;
        }

        const members = data.members || [];
        const channels = data.channels || [];
        const onlineCount = members.length;

        function renderChannels() {
            if (!channels.length) {
                return '<div class="discord-voice-channel" style="color:#e3e5e8;font-size:0.82rem;padding:0.45rem 1.25rem">No voice channels available</div>';
            }
            return channels
                .map(
                    (ch) => `
                <div class="discord-voice-channel" style="color:#ffffff; display:flex; align-items:center; gap:5px;">
                    <span style="color:#5865f2; font-weight:bold;">[#]</span>
                    <span>${ch.name}</span>
                    ${ch.position != null
                        ? `<span class="discord-voice-channel-user-count" style="color:#23a55a; margin-left:auto;">[•] ${ch.position}</span>`
                        : ''}
                </div>`
                )
                .join('');
        }

        function statusClass(status) {
            switch (status) {
                case 'online':
                    return 'online';
                case 'idle':
                    return 'idle';
                case 'dnd':
                    return 'dnd';
                default:
                    return '';
            }
        }

        function renderMembers() {
            if (!members.length) {
                return '<div class="discord-widget-empty" style="color:#e3e5e8;">No members online right now</div>';
            }
            let html = '<div class="discord-members-grid">';
            members.forEach((m) => {
                const avatarUrl =
                    m.avatar_url ||
                    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"%3E%3Crect width="32" height="32" rx="16" fill="%235865f2"/%3E%3Ctext x="16" y="20" text-anchor="middle" fill="%23fff" font-size="14" font-weight="700"%3E' +
                    (m.username ? m.username.charAt(0).toUpperCase() : '?') +
                    '%3C/text%3E%3C/svg%3E';
                html += `
                    <div class="discord-member" title="${m.username || 'Unknown'}" onclick="window.open('${DISCORD_INVITE}', '_blank')">
                        <div class="discord-member-avatar-wrapper">
                            <img class="discord-member-avatar" src="${avatarUrl}" alt="${m.username || 'Member'}" loading="lazy" onerror="this.src='data:image/svg+xml,%253Csvg xmlns=%2522http://www.w3.org/2000/svg%2522 width=%252232%2522 height=%252232%2522 viewBox=%25220 0 32 32%2522%253E%253Crect width=%252232%2522 height=%252232%2522 rx=%252216%2522 fill=%2522%25235865f2%2522/%253E%253Ctext x=%252216%2522 y=%252220%2522 text-anchor=%2522middle%2522 fill=%2522%2523fff%2522 font-size=%252214%2522 font-weight=%2522700%2522%253E${(m.username ? m.username.charAt(0).toUpperCase() : '?')}%253C/text%253E%253C/svg%253E'">
                            <span class="discord-member-status ${statusClass(m.status)}"></span>
                        </div>
                        <span class="discord-member-name" style="color:#ffffff;">${m.username || 'Unknown'}</span>
                    </div>`;
            });
            html += '</div>';
            return html;
        }

        widget.innerHTML = `
            <div class="discord-widget-header" style="color:#ffffff;">
                <div class="discord-widget-header-left" style="display:flex; align-items:center; gap:8px;">
                    <span style="font-weight:bold; color:#5865f2;">[D]</span>
                    <span style="color:#ffffff; font-weight:bold;">${data.name || 'Community'}</span>
                </div>
                <div class="discord-widget-online" style="color:#e3e5e8;">
                    <span class="discord-widget-online-dot"></span>
                    <span><span id="discord-online-count" style="color:#ffffff; font-weight:bold;">${onlineCount}</span> Online</span>
                </div>
            </div>
            <div class="discord-widget-body">
                <div class="discord-widget-section-title" style="color:#ffffff; font-weight:bold; display:flex; align-items:center; gap:5px;">
                    <span style="color:#5865f2;">•</span> Voice Channels
                </div>
                ${renderChannels()}
                <div class="discord-widget-section-title" style="margin-top:0.75rem; color:#ffffff; font-weight:bold; display:flex; align-items:center; gap:5px;">
                    <span style="color:#5865f2;">•</span> Members Online — ${onlineCount}
                </div>
                ${renderMembers()}
            </div>
            <div class="discord-widget-footer">
                <a href="${DISCORD_INVITE}" target="_blank" rel="noreferrer" class="discord-widget-join-btn" style="color:#ffffff; display:flex; align-items:center; justify-content:center; gap:5px; text-decoration:none; background-color:#5865f2; padding:8px 16px; border-radius:4px; font-weight:bold;">
                    <span>[Join]</span> Join Discord
                </a>
            </div>`;
    }

    async function fetchWidget() {
        try {
            const res = await fetch(WIDGET_API);
            if (!res.ok) {
                if (res.status === 403) {
                    widget.innerHTML =
                        '<div class="discord-widget-error" style="color:#ff6b6b;">Discord widget is not enabled for this server. Please enable it in Discord Server Settings &gt; Widget.</div>';
                    return;
                }
                if (res.status === 404) {
                    widget.innerHTML =
                        '<div class="discord-widget-error" style="color:#ff6b6b;">Discord server not found.</div>';
                    return;
                }
                renderError();
                return;
            }
            const data = await res.json();
            render(data);
        } catch {
            renderError();
        }
    }

    renderLoading();
    fetchWidget();
    setInterval(fetchWidget, REFRESH_INTERVAL);
})();