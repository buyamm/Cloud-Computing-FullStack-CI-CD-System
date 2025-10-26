import React, { useEffect } from 'react'
import scrollToTop from '../../../Helper/scroll'

const Address = () => {
    useEffect(() => {
        scrollToTop()
      }, [])
    return (
        <div className='p-2'>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d122758.06093401194!2d108.10172069891567!3d15.951482355762211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x31421090313bde5f%3A0xfed54933c2d496ae!2zNDYgVsO1IENow60gQ8O0bmcsIEhvw6AgSOG6o2ksIE5nxakgSMOgbmggU8ahbiwgxJDDoCBO4bq1bmcgNTUwMDAwLCBWaeG7h3QgTmFt!3m2!1d15.9833953!2d108.253996!5e0!3m2!1svi!2s!4v1734770933999!5m2!1svi!2s"
                width="100%"
                height="500px"
                style={{ border: '0px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
    )
}

export default Address