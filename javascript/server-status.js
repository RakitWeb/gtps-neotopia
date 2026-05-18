function formatTimestamp() {
    return new Intl.DateTimeFormat(undefined, {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).format(new Date());
}

function getStatusElements() {
    return {
        playerEl: document.getElementById('player-count'),
        statusText: document.getElementById('status-text'),
        statusDot: document.getElementById('status-dot'),
        statusConnection: document.getElementById('status-connection'),
        statusResponse: document.getElementById('status-response'),
        statusUpdated: document.getElementById('status-updated'),
        statusServerId: document.getElementById('status-server-id-value'),
        statusRefreshRate: document.getElementById('status-refresh-rate')
    };
}

function loadStaticStatus() {
    const config = window.SITE_CONFIG && window.SITE_CONFIG.serverStatus;
    const elements = getStatusElements();
    if (!elements.statusText || !elements.statusDot || !elements.playerEl || !elements.statusConnection || !elements.statusResponse || !elements.statusUpdated) return;

    if (elements.statusServerId && config) {
        elements.statusServerId.textContent = config.serverId || '1866';
    }
    if (elements.statusRefreshRate && config) {
        elements.statusRefreshRate.textContent = config.refreshValue || '30s';
    }

    elements.statusText.textContent = 'Online';
    elements.statusText.style.color = 'var(--success-color)';
    elements.statusDot.className = 'status-dot online';
    elements.playerEl.textContent = '100+';
    elements.statusConnection.textContent = 'Success';
    elements.statusResponse.textContent = 'Neotopia server is online and running smoothly.';
    elements.statusUpdated.textContent = formatTimestamp();
}

document.addEventListener('DOMContentLoaded', loadStaticStatus);
