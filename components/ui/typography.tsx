import React from "react"

type Props = {
  children: React.ReactNode
}

function Typography({ children }: Props) {
  return { children }
}

Typography.p = function P({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>
}

Typography.h1 = function H1({ children }: { children: React.ReactNode }) {
  return <h1 className="text-4xl/[150%] text-primary-text">{children}</h1>
}

Typography.h2 = function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-4xl/[150%] text-primary">{children}</h2>
}

Typography.h3 = function H3({ children }: { children: React.ReactNode }) {
  return <h3>{children}</h3>
}

Typography.h4 = function H4({ children }: { children: React.ReactNode }) {
  return <h4>{children}</h4>
}

Typography.h5 = function H5({ children }: { children: React.ReactNode }) {
  return <h5>{children}</h5>
}

Typography.h6 = function H6({ children }: { children: React.ReactNode }) {
  return <h6>{children}</h6>
}

Typography.span = function Span({ children }: { children: React.ReactNode }) {
  return <span>{children}</span>
}

Typography.small = function Small({ children }: { children: React.ReactNode }) {
  return <span>{children}</span>
}

Typography.strong = function Strong({
  children,
}: {
  children: React.ReactNode
}) {
  return <strong>{children}</strong>
}

Typography.large = function Large({ children }: { children: React.ReactNode }) {
  return <span className="text-xl">{children}</span>
}

Typography.em = function Em({ children }: { children: React.ReactNode }) {
  return <em>{children}</em>
}

Typography.muted = function Muted({ children }: { children: React.ReactNode }) {
  return <span>{children}</span>
}

export default Typography
