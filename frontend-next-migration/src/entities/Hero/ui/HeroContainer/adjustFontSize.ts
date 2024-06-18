function adjustFontSize(container: HTMLElement, heroName: HTMLElement): void {
  const containerWidth = container.clientWidth;
  const maxFontSize = containerWidth * 0.05; // 5% of container's width
  const minFontSize = 16; // minimum font size

  heroName.style.fontSize = `${Math.max(minFontSize, maxFontSize)}px`;
}

export default adjustFontSize;
