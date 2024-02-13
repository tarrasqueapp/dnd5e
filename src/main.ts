import { Campaign, tarrasque } from '@tarrasque/sdk';

import './style.css';

let campaign: Campaign;

async function main() {
  tarrasque.emit('VIEWPORT_SET_POSITION', { x: 0, y: 0 });
  tarrasque.emit('VIEWPORT_SET_SCALE', 1);

  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <div>
      <p>
        Hi ${campaign?.name}
      </p>
    </div>
  `;
}

tarrasque.on('READY', async () => {
  campaign = await tarrasque.get('CAMPAIGN');
  main();
});

tarrasque.on('CAMPAIGN_CHANGED', (updatedCampaign) => {
  campaign = updatedCampaign;
  main();
});

// Re-render on HMR
if (import.meta.hot) {
  import.meta.hot.accept();
  tarrasque.emit('READY');
}
