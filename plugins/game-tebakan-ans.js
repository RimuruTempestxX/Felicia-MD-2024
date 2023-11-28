import similarity from 'similarity'
const threshold = 0.72
export async function before(m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/Ketik.*hteb/i.test(m.quoted.text) || /.*hteb/i.test(m.text))
        return !0
    this.tebaktebakan = this.tebaktebakan ? this.tebaktebakan : {}
    if (!(id in this.tebaktebakan))
        return conn.reply(m.chat, '*Soal Itu Telah Berakhir*', m)
    if (m.quoted.id == this.tebaktebakan[id][0].id) {
        let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
        if (isSurrender) {
            clearTimeout(this.tebaktebakan[id][3])
            delete this.tebaktebakan[id]
            return conn.reply(m.chat, '*Anda Telah Menyerah*', m)
        }
        let json = JSON.parse(JSON.stringify(this.tebaktebakan[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.tebaktebakan[id][2]
            conn.reply(m.chat, `*BENAR*\n+${this.tebaktebakan[id][2]} ✨ XP`, m)
            clearTimeout(this.tebaktebakan[id][3])
            delete this.tebaktebakan[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold)
            m.reply(`*Sedikit Lagi*`)
        else
            conn.reply(m.chat, `*Salah*`, m)
    }
    return !0
}
export const exp = 0