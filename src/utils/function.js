// format input number
export const formatNumber = (input) => {
  // hapus input selain angka
  const numericValue = input.replace(/[^0-9]/g, "")

  // tambah "." di setiap ribuan dan seterusnya
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}


// check form input kosong
export const hasNullOrEmpty = (data, ignore = []) => {
  const ignoredKeys = ignore

  for (const key in data) {
      // skip pengecekan untuk list key yg di ignored
      if (ignoredKeys.includes(key)) {
          continue
      }

      // eslint-disable-next-line no-prototype-builtins
      if (data.hasOwnProperty(key)) {
          const value = data[key]
          if (value === null || value === "") {
              return true  // kembalikan true jika ada value yg kosong
          }
      }
  }
  return false  // kembalikan false jika tidak ada value yg kosong
}


// format angka ke rupiah
export const formatIDRCurrency = (number) => {
  return new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 0,
  }).format(number)
}


// format tanggal
export const formatDate = (dateString) => {
  const date = new Date(dateString)

  // opsi formatting
  const options = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Jakarta',
    timeZoneName: 'short',
  }

  const formattedDate = date.toLocaleString('id-ID', options)

  return formattedDate.replace('GMT+7', 'WIB')
}
