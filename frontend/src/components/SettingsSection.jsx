export default function SettingsSection({ Icon, title, description, children }) {
  return <section className="user-settings-section"><header><span><Icon size={18}/></span><div><h2>{title}</h2><p>{description}</p></div></header><div className="user-settings-body">{children}</div></section>;
}
