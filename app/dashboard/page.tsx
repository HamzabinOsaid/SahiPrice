'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const data = {
  Rawalpindi: {
    '🥩 Meat & Poultry': {
      'Chicken (per kg)': { range: [700, 1000], shops: ['Meat 2 Meat Rawalpindi', 'Pakeeza Meat', 'Al-Baraka Poultry', 'Saddar Chicken House', 'Raja Broast & Meat'] },
      'Beef (per kg)': { range: [1500, 2500], shops: ['Meat 2 Meat Rawalpindi', 'Al Madina Meat', 'Faisal Meat Shop', 'Liaquat Bazar Butcher', 'Cantt Meat Center'] },
      'Mutton (per kg)': { range: [2500, 4000], shops: ['Pakeeza Meat', 'Al Madina Meat', 'Bahadur Khan Meat', 'Saddar Mutton House', 'City Meat Market'] },
      'Mince (per kg)': { range: [900, 1400], shops: ['Meat 2 Meat Rawalpindi', 'Pakeeza Meat', 'Al Madina Meat'] },
      'Sausages / Kabab': { range: [300, 700], shops: ['Al-Shams Deli', 'Pakeeza Meat', 'Meat 2 Meat Rawalpindi'] },
    },
    '🥦 Vegetables & Fruit': {
      'Tomatoes (per kg)': { range: [60, 160], shops: ['Raja Bazaar Sabzi Mandi', 'Liaquat Bazar Veggie', 'Green Fresh Market', 'City Sabzi Market'] },
      'Potatoes (per kg)': { range: [50, 120], shops: ['Raja Bazaar Sabzi Mandi', 'Liaquat Bazar Veggie', 'Fresh Produce Saddar'] },
      'Onions (per kg)': { range: [60, 140], shops: ['Raja Bazaar Sabzi Mandi', 'Green Fresh Market', 'Cantt Vegetable Stall'] },
      'Apples (per kg)': { range: [200, 450], shops: ['Fruit Wala Saddar', 'Cantt Fruit Stand', 'Fresh Bazar RWP'] },
      'Bananas (per dozen)': { range: [80, 160], shops: ['Fruit Wala Saddar', 'Liaquat Bazar Fruit', 'Green Fresh Market'] },
    },
    '❄️ AC Services': {
      'AC Repair': { range: [1500, 5000], shops: ['Cool Care Services', 'Pak AC Experts', 'Shaheen Cooling', 'Cantt AC Workshop', 'City Cool RWP'] },
      'AC Installation': { range: [2500, 6000], shops: ['Cool Care Services', 'City Cooling RWP', 'Pak AC Experts', 'National AC Services'] },
      'AC Gas Refill': { range: [2000, 4500], shops: ['Cool Care Services', 'Shaheen Cooling', 'AC Solutions RWP', 'Pak AC Experts'] },
      'AC Servicing': { range: [1000, 2500], shops: ['Pak AC Experts', 'City Cool RWP', 'Cool Care Services', 'National AC Services'] },
    },
    '🛵 Mobile Repair': {
      'Screen Replacement': { range: [2000, 12000], shops: ['iTech Saddar', 'Mobile Zone RWP', 'Cantt Phone Repair', 'Digital Fix Center', 'iFix Rawalpindi'] },
      'Battery Replacement': { range: [500, 2500], shops: ['Mobile Zone RWP', 'iTech Saddar', 'Phone Doctor RWP'] },
      'Charging Port Fix': { range: [500, 2000], shops: ['iTech Saddar', 'Digital Fix Center', 'Mobile Zone RWP'] },
      'Software/Flash': { range: [500, 1500], shops: ['Cantt Phone Repair', 'Mobile Zone RWP', 'iTech Saddar'] },
    },
    '🍽️ Food & Restaurants': {
      'Biryani (plate)': { range: [250, 700], shops: ['Student Biryani RWP', 'Al-Shams Restaurant', 'Karachi Darbar RWP', 'Usmania Restaurant', 'Food Street Rawalpindi'] },
      'Burger': { range: [200, 800], shops: ['Lahori Burger RWP', 'Peri Peri RWP', 'Burger Lab RWP', 'The Burger Spot', 'Bun Kebab Corner'] },
      'Pizza (medium)': { range: [600, 2000], shops: ['Pizza Hut Rawalpindi', 'Domino\'s RWP', 'Pizza Point', '2 Bros Pizza RWP'] },
      'Desi Breakfast': { range: [150, 500], shops: ['Pindi Paye House', 'Al-Mustafa Nashta', 'Saddar Nashta Corner', 'Cantt Breakfast Dhaba'] },
      'Chai (cup)': { range: [30, 100], shops: ['Pindi Dhaba', 'Saddar Tea House', 'Irani Chai Rawalpindi'] },
    },
    '🏠 Home Services': {
      'Plumber (per visit)': { range: [500, 2000], shops: ['Pindi Plumber Pro', 'Home Fix RWP', 'City Plumbers', 'Hasan Plumbing Services'] },
      'Electrician (per visit)': { range: [500, 2500], shops: ['Pak Electric Services', 'City Electricians RWP', 'Home Tech Services', 'Power Fix RWP'] },
      'House Cleaning (per session)': { range: [2000, 6000], shops: ['CleanPro RWP', 'Sapphire Cleaning', 'Home Fresh Services', 'City Clean'] },
      'Painter (per day)': { range: [1500, 4000], shops: ['Color Master RWP', 'Pindi Paint Works', 'Wall Art Services', 'City Painters'] },
    },
    '👗 Clothes & Tailoring': {
      'Shirt Stitching': { range: [400, 1500], shops: ['Saddar Darzi', 'Master Tailor RWP', 'Fashion Stitch RWP', 'Classic Tailors'] },
      'Shalwar Kameez Stitching': { range: [600, 2500], shops: ['Pindi Tailors', 'Royal Stitch RWP', 'Classic Tailors', 'Cantt Darzi'] },
      'T-Shirt (ready-made)': { range: [500, 2000], shops: ['Al-Hamra Cloth', 'Saddar Garments', 'Star Clothing RWP', 'Bonanza RWP'] },
      'Jeans (ready-made)': { range: [1500, 5000], shops: ['Levis RWP', 'Saddar Denim', 'Al-Hamra Cloth', 'Style Park RWP'] },
    },
    '🚗 Auto & Transport': {
      'Car Wash': { range: [300, 1000], shops: ['Speed Wash RWP', 'Pindi Auto Wash', 'Crystal Car Care', 'Cantt Car Wash'] },
      'Oil Change (per litre)': { range: [700, 1500], shops: ['Total Parco RWP', 'PSO Station Saddar', 'Shell Rawalpindi', 'Auto Zone RWP'] },
      'Tyre Puncture Fix': { range: [150, 400], shops: ['Pindi Tyre Shop', 'City Tyre Works', 'Cantt Tyre Center', 'Road Fix RWP'] },
      'Uber/Careem (per km)': { range: [25, 50], shops: ['Uber', 'Careem', 'Bykea', 'inDriver'] },
    },
  },
  Lahore: {
    '🥩 Meat & Poultry': {
      'Chicken (per kg)': { range: [700, 1000], shops: ['Meat One Gulberg', 'Al-Fatah Meat Lahore', 'K&N\'s Lahore', 'Chaudhry Murgh Mahal', 'Defense Poultry'] },
      'Beef (per kg)': { range: [1500, 2500], shops: ['Meat One Lahore', 'Metro Meat Lahore', 'Butt Butcher Anarkali', 'Liberty Meat Shop', 'Chaudhry Beef House'] },
      'Mutton (per kg)': { range: [2500, 4000], shops: ['Al-Fatah Meat', 'Meat One', 'Gourmet Butcher Lahore', 'Cantt Mutton House', 'Old City Butcher'] },
      'Mince (per kg)': { range: [900, 1400], shops: ['Meat One Lahore', 'Al-Fatah Meat', 'K&N\'s Lahore'] },
      'Sausages / Kabab': { range: [300, 700], shops: ['K&N\'s Lahore', 'Meat One Lahore', 'Deli Shop Gulberg'] },
    },
  },
  Karachi: {
    '🥩 Meat & Poultry': {
      'Chicken (per kg)': { range: [700, 1000], shops: ['K&N\'s Karachi', 'Meat One Karachi', 'Clifton Poultry', 'Al-Maidah Meat', 'Korangi Murgh House'] },
    },
  },
  Islamabad: {
    '🥩 Meat & Poultry': {
      'Chicken (per kg)': { range: [700, 1000], shops: ['Meat One F-10', 'Al-Fatah ISB', 'Islamabad Murgh Mahal', 'G-11 Poultry', 'Super Market Meat'] },
    },
  },
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedCat, setSelectedCat] = useState<string | null>(null)
  const [selectedSub, setSelectedSub] = useState<string | null>(null)
  const [city, setCity] = useState('Rawalpindi')
  const [price, setPrice] = useState('')
  const [result, setResult] = useState<any>(null)
  const [searchCount, setSearchCount] = useState(0)
  const [rateLimitError, setRateLimitError] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/login')
      } else {
        setUser(user)
        fetchSearchCount()
      }
      setLoading(false)
    }
    checkAuth()
  }, [router])

  const fetchSearchCount = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const oneHourAgo = new Date(Date.now() - 3600000).toISOString()
    const { count } = await supabase
      .from('searches')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('created_at', oneHourAgo)

    setSearchCount(count || 0)
    setRateLimitError(count! >= 5)
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  const handleCheckPrice = async () => {
    if (!selectedCat || !selectedSub || !price) {
      alert('Please select category, subcategory, and enter a price')
      return
    }

    if (searchCount >= 5) {
      setRateLimitError(true)
      return
    }

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const entry = (data as any)[city][selectedCat][selectedSub]
    const [low, high] = entry.range
    const priceVal = Number(price)

    let verdict = '', cls = '', pct = 0
    if (priceVal < low * 0.85) {
      verdict = 'Very Cheap ✓'
      cls = 'good'
      pct = Math.max(5, Math.round((priceVal / low) * 40))
    } else if (priceVal <= low) {
      verdict = 'Below Average ✓'
      cls = 'good'
      pct = Math.round(40 + ((priceVal - low * 0.85) / (low - low * 0.85)) * 10)
    } else if (priceVal <= high) {
      verdict = 'Fair Price ✓'
      cls = 'warn'
      pct = Math.round(50 + ((priceVal - low) / (high - low)) * 30)
    } else if (priceVal <= high * 1.2) {
      verdict = 'A Bit Pricey ⚠'
      cls = 'warn'
      pct = Math.round(80 + ((priceVal - high) / (high * 0.2)) * 10)
    } else {
      verdict = 'Overpriced ✗'
      cls = 'bad'
      pct = 100
    }

    setResult({
      verdict,
      cls,
      pct,
      low,
      high,
      shops: entry.shops,
      selectedCat,
      selectedSub,
    })

    // Log search to database
    await supabase.from('searches').insert({
      user_id: user.id,
      city,
      category: selectedCat,
      subcategory: selectedSub,
      price: priceVal,
    })

    // Update search count
    fetchSearchCount()
  }

  if (loading) {
    return <div style={styles.loadingContainer}>Loading...</div>
  }

  const categories = Object.keys((data as any)[city] || {})
  const subcategories = selectedCat ? Object.keys((data as any)[city][selectedCat] || {}) : []

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>💸 SahiPrice</h1>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>

      <div style={styles.card}>
        <div style={styles.grid2}>
          <div style={styles.field}>
            <label style={styles.label}>City</label>
            <select value={city} onChange={(e) => { setCity(e.target.value); setSelectedCat(null); setSelectedSub(null) }} style={styles.input}>
              {Object.keys(data).map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Enter Price (PKR)</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g. 2500" min="0" style={styles.input} />
          </div>
        </div>

        <label style={styles.label}>Category</label>
        <div style={styles.catGrid}>
          {categories.map((cat) => (
            <div
              key={cat}
              onClick={() => { setSelectedCat(cat); setSelectedSub(null) }}
              style={{
                ...styles.catPill,
                ...(selectedCat === cat ? styles.catPillActive : {}),
              }}
            >
              {cat}
            </div>
          ))}
        </div>

        <label style={styles.label}>Subcategory</label>
        <div style={styles.catGrid}>
          {subcategories.length > 0 ? (
            subcategories.map((sub) => (
              <div
                key={sub}
                onClick={() => setSelectedSub(sub)}
                style={{
                  ...styles.subPill,
                  ...(selectedSub === sub ? styles.subPillActive : {}),
                }}
              >
                {sub}
              </div>
            ))
          ) : (
            <span style={styles.placeholder}>Select a category first</span>
          )}
        </div>

        <div style={styles.searchInfo}>
          Searches used: {searchCount}/5 per hour
        </div>

        {rateLimitError && (
          <div style={styles.limitError}>
            You've reached your search limit. Try again after an hour.
          </div>
        )}

        <button onClick={handleCheckPrice} disabled={rateLimitError} style={{...styles.btn, opacity: rateLimitError ? 0.5 : 1}}>
          Check Price
        </button>
      </div>

      {result && (
        <>
          <div style={styles.card}>
            <div style={styles.resultBox}>
              <div style={{...styles.verdict, color: result.cls === 'good' ? '#34d399' : result.cls === 'warn' ? '#fbbf24' : '#f87171'}}>
                {result.verdict}
              </div>
              <div style={styles.rangeLabel}>Expected fair range: PKR {result.low.toLocaleString()} – {result.high.toLocaleString()}</div>
              <div style={styles.priceBar}>
                <div style={{...styles.priceBarFill, width: `${result.pct}%`, background: result.cls === 'good' ? '#34d399' : result.cls === 'warn' ? '#fbbf24' : '#f87171'}} />
              </div>
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.shopsHeader}>
              <h3 style={styles.shopsTitle}>Suggested Shops / Services</h3>
              <span style={styles.shopCount}>{result.shops.length} options</span>
            </div>
            {result.shops.map((shop: string, idx: number) => (
              <div key={idx} style={styles.shopCard}>
                <div>
                  <div style={styles.shopName}>{shop}</div>
                  <div style={styles.shopMeta}>{result.selectedCat} • {result.selectedSub}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  container: { maxWidth: '960px', margin: 'auto', padding: '28px 20px', background: '#080e1c', minHeight: '100vh' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' },
  title: { fontSize: '28px', fontWeight: '800', color: '#e2e8f0', margin: 0 },
  logoutBtn: { padding: '10px 20px', borderRadius: '8px', background: '#f87171', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: '600', fontSize: '14px' },
  card: { background: '#111827', padding: '24px', borderRadius: '16px', marginBottom: '16px', border: '1px solid #1e293b', color: '#e2e8f0', fontFamily: 'system-ui, -apple-system, sans-serif' },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '18px' },
  field: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '12px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' },
  input: { padding: '11px 14px', borderRadius: '10px', border: '1px solid #1e293b', background: '#0f172a', color: '#e2e8f0', fontSize: '14px', outline: 'none' },
  catGrid: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '18px' },
  catPill: { padding: '7px 14px', borderRadius: '99px', border: '1px solid #1e293b', background: '#0f172a', color: '#94a3b8', fontSize: '13px', cursor: 'pointer', userSelect: 'none' },
  catPillActive: { background: '#1e3a5f', borderColor: '#38bdf8', color: '#38bdf8', fontWeight: '600' },
  subPill: { padding: '6px 13px', borderRadius: '99px', border: '1px solid #1e293b', background: '#0f172a', color: '#94a3b8', fontSize: '12px', cursor: 'pointer', userSelect: 'none' },
  subPillActive: { background: '#1e1b4b', borderColor: '#818cf8', color: '#818cf8', fontWeight: '600' },
  placeholder: { color: '#475569', fontSize: '13px' },
  searchInfo: { fontSize: '13px', color: '#94a3b8', marginBottom: '12px' },
  limitError: { color: '#f87171', fontSize: '13px', background: 'rgba(248, 113, 113, 0.1)', padding: '10px', borderRadius: '8px', marginBottom: '12px' },
  btn: { width: '100%', padding: '14px', border: 'none', borderRadius: '12px', background: 'linear-gradient(135deg, #38bdf8, #818cf8)', color: '#fff', fontWeight: '700', fontSize: '15px', cursor: 'pointer' },
  resultBox: { textAlign: 'center' },
  verdict: { fontSize: '28px', fontWeight: '800', letterSpacing: '-1px', marginBottom: '6px' },
  rangeLabel: { marginTop: '6px', fontSize: '13px', color: '#64748b' },
  priceBar: { height: '8px', borderRadius: '99px', background: '#1e293b', margin: '14px 0 6px', overflow: 'hidden' },
  priceBarFill: { height: '100%', borderRadius: '99px', transition: 'width 0.6s ease' },
  shopsHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' },
  shopsTitle: { fontSize: '15px', fontWeight: '700', margin: 0 },
  shopCount: { fontSize: '12px', color: '#64748b' },
  shopCard: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '14px 16px', marginBottom: '10px' },
  shopName: { fontWeight: '600', fontSize: '14px', marginBottom: '2px' },
  shopMeta: { fontSize: '12px', color: '#64748b' },
  loadingContainer: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#080e1c', color: '#e2e8f0', fontFamily: 'system-ui, -apple-system, sans-serif' },
}
