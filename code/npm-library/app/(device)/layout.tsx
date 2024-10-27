import React from 'react'
import { MobileLayout } from '../../src/widget/layout'

export default function Layout({ children }: { children: React.ReactNode }) {
  return <MobileLayout>{children}</MobileLayout>
}
