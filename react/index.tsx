import { createRoot } from "react-dom/client"
import { useDeckLink } from "react-deck-link"
import { useEffect, useRef, useState } from "react"

const OpenLink = ({ token = "" }) => {
  const { open, isReady } = useDeckLink({ token })

  useEffect(() => {
    isReady && open()
  }, [isReady, open])

  return (
    <button onClick={open} disabled={!isReady}>
      Connect
    </button>
  )
}

const LinkForm = () => {
  const [confirmed, setConfirmed] = useState(false)
  const tokenRef = useRef<HTMLInputElement>(null)

  return (
    <div>
      <input
        type="text"
        placeholder="link-00000000-0000-0000-0000-000000000000"
        ref={tokenRef}
        disabled={confirmed}
      />
      {!confirmed && (
        <button onClick={() => setConfirmed(true)}>Connect</button>
      )}
      {confirmed && <OpenLink token={tokenRef.current.value} />}
    </div>
  )
}

createRoot(document.getElementById("app")!).render(<LinkForm />)
