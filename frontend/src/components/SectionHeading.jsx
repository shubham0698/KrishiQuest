export default function SectionHeading({ eyebrow, title, text, align = 'center', light = false }) {
  return (
    <div className={`section-heading section-heading--${align}${light ? ' section-heading--light' : ''}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}
