import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from "react-icons/fa";
import formatPrice from '../../../Helper/formatPrice'
import { LiaCartPlusSolid } from "react-icons/lia";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { Link } from "react-router-dom";
import api from '../../../Helper/api'
import BeatLoader from "react-spinners/BeatLoader";
import scrollToTop from '../../../Helper/scroll';


const Detail = () => {
  //lấy thông tin từ local storage
  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    scrollToTop()
  }, [])

  // lấy cái id từ params 
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  // thay đổi trạng thái 
  const [quantity, setQuantity] = useState(1)
  //sử lý số lượng sản phẩm 
  const handlePlus = () => {
    setQuantity(quantity + 1)
  }
  const handleMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
    else {
      alert('không thể giảm số lượng nữa')
    }
  }
  // sử lý lựa chọn phiên bản
  const [select, setSelect] = useState(null)
  const handleSelect = (id) => {
    setSelect(id)
  }
  //sử lý lựa chọn màu
  const [selectColor, setSelectColor] = useState(null)
  const handleSelectColor = (id) => {
    setSelectColor(id)
  }
  //fake data
  const data = [

    {
      id: 3,
      color: 'Đen ',
      image: 'https://www.didongmy.com/vnt_upload/news/10_2022/top-dien-thoai-chup-anh-dep-dang-mua-nhat-trong-nam-2022-didongmy.png'
    },
    {
      id: 4,
      color: 'Trắng',
      image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSEhAWFhUVFRcVGBUVFRUXFRUVFRUXGBYVFRYYHSggGBolGxUVITIhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGy8fHiYtLS01MjctNS4tLS4vKy4vLS0vLS0vLTAtLS0rKy0tMC0tNS8rLTUtLS0tLS0tLSstLf/AABEIAKgBLAMBIgACEQEDEQH/xAAcAAABBAMBAAAAAAAAAAAAAAAABQYHCAEDBAL/xABOEAABAgMDBAoOCAYBBAMAAAABAAIDBBEFEiEGBzFRExQiQWFxc4GRsTIzNVJydIKSoaKys9HSIzRTVJPBwuEVFyVCRGIkFkNj8IOj1P/EABoBAQADAQEBAAAAAAAAAAAAAAABAgQDBQb/xAAqEQEAAgIBAwIGAQUAAAAAAAAAAQIDEQQSEyExURQyQVJhoSIFgZHB0f/aAAwDAQACEQMRAD8AiCQkokeIyDCbeiPN1ragVOqpIA504f5dWp9yP4sD51zZv+6Upyw6irIIK8fy6tT7mfxYHzo/l1an3I/iwPnVh0IK8/y7tX7kfxYHzryc3lqfcnc0SD86sQhBW+PkVaTMXSMXyQHeySkWZlnwzdiw3w3d69rmnocFapctpWdBmGGHHhNiMP8Aa8A841HhCCrKAn3nCyBMjWPAq+WJxBxdBJ0Bx32bwdzHWmKgEIQgwVuk5V8WIyFDaXPe4Na0Uq5xNAMcBzrSn1mcsvZZ/ZSKtgQy/wAt+4Z6C8+SgS4+QFpMaXPlbrRpLo0AAc+yJDdIkYOiwh/8rXexVPDOHlDEnZqJAa8iXgG7daezcNJOvEHoXQ7ISHDuh8QAloO5gPiNFd6+DjoROjH2oPt4PnO+VG1R9vB893ypft+wWysUwnBjtyHAhoGBrpG8cD6E3557WEAQ26K1LQgztUfbwfPd8qNqD7eD57vlXJtn/RnmoZMV/sh4Y9jpRDr2qPt4Pnu+RG1R9vB893yrayGwgG4MQDoG+nJJ5HB8GHGc8ARBUBkAxKCpoCWnA4asESQ7MybmZk0gNZEI3mx4NegvBSn/AC7tX7kfxYHzrRblgOkzCiwopvOvOY4NdDcCwgEFjsRpGKmTNxlGZ6UD39tYbkThI0O5wiEJ2xklOykPZZiXMNl4NvX4Tt0a0FGuJ3ikQqc89Pc4cvD6nqCyg2y0B0R7YbBV73NY0VAq5xAaKnAYkaU5f5dWr9yP4sD50kZLn/mynjMD3rFZ5BXc5ubV+5H8WB86QbUs2LLRHQY8MsiNpVpIODhUEEEgih3laZRhnssG9ChzrBjDpDiU34bjuHHicaeWgh0LKwAvSDCyxpJAAxJAA4SaBYW2T7ZD8NntBA4/5c2p9yP4sD51n+XVq/cj+LA+dWHKEFV7QkokCI6FFbdiMN1zag0NK0q0kHSNC56JwZxO6U3yv6WpunjQOLIDulKcsOoqyCrfkB3SlOWHUVZBAIQokyxzjzsrOx5eEINyG4AXmOLqFjXYkOG+UEtoUF/zZtHvZf8ADf8AOuiDnenQd1AgOHAHt9N4oJsQmTkdnGgTrxBiM2GMexaXXmPOpjtfAQnsg1TMuyIx0N7Q5j2lrmnEOaRQgqt2V9hGRm4kualoN6G4/wB0J3YnjGLTwtKssowz42aDCgTIGLHmE4/6xAXNrxOZ6yCHiUIqiqAU2Zm7N2KRiRyN1He4g79yEC1vrXzzqFWMLiGtFXEgAayTQAc6s7ZNnCWlYcAaIUEM4yG4nnNTzoK8yxrEjHXGf1pSbNRwKNiRQAMAHvAA4ACuCzz9JFwr9O7DnXW5g7/q+KiVmmNfcSXXiTpJqSeMlc0WXvaWV4wu2DEDHVvgmjgAQD2TS2tCdIrXjC7HWnCrXYodKOBFBSri0hwx3JF3DjKIIRkh9n6qxtMfZ+qlmZnYbnBwhsbQuwaBQhwIIIOnTUal7ZakKprBhuBdWhAB0UpUc/TvIEfYnd6egrdBjxmCjHxWjU1z2joBXXMzkMto1rWG4Q4gNoauabwG92JHlnUFw7GPtOr4oPMxEe41e5zjreXE01VcpDzFvwm27we09Y/JR88Ubga4jVhp3qp/5i/8vw2/mpgLWenucOXh9T1BYCnTPT3OHLw+p6gxEFLJcf8ANlfGYHvWqzyrDkv9dlPGYHvWqzyAXPaMkyPCfBiCrIjSxw4HCmHCuhCCrVr2c+WjxJeJ2UJxaeGnYuHARQ865FK2e6we1zzBqhRac5huPpb5qiuNCLTdcKH4oPJW2S7ZD5RntBaVuku2Q/DZ7QQWrKEFCCuGcPulN8r+lqbl1OPOH3Sm+V/S1N2qBw5v+6Upyw6irIKt+b/ulKcsOoqyCAVeM5V3+IzWm/srdV27sTOetVYdV0zlH+pzXht90xA2lkleShB7a8gggkEEEEYEEYgg7xCslkVbBnJKDHd2bm3X+GwlrjzkV51WsqdczFf4djo2eLTi3P51QPtNPOpL37LmP9djePJisr6Kp2Ju5xO5k3yR9oIK4hBKwgBA6M2ll7YtGACKthkxncULFvrlisFaES7CiOpW7De6mujSaKMsxlmUZMTRHZObBbxNF59OdzfNUnTgBhvDuxLHVropdNa8yCuVn9si8u7rXpy82efpItft3da2ugu1ekfFQsd+T88x8hPQWS7GbHJFzonZRIkUggvLjobqaNC35G2jMRnQIUAy0CXhFjIsJ5Y6JMb8R9HNvPc4YYUodabdiz+wQZuG5jiZmAYLSC2jSa4uqdGO8u6Xn5AmDFiyUVsaEGVEu+E2DFdDNWvcCatJIBNPSiCbasaVbEjNEq9rxOFzWucWNbLtdjAczS0nHHeB4MXlY89HmYUeLGEB0oZeIWSUEMdFYWm6y61rQ5tKE3id8Gg3mnaGUMaK+I50GCWxJlsyWua12LGtaIZcdLC1oBwxqdFaJUk7bkpeKZqWk4zY5DrsN0SHteG54oSKbotxNG9WFA75QTjJOSNlw2Oa+HemHBsN16YqL7Y5fi1gxGFMBpGCb+cSz4cCecIIAZEhsjBrexF+oIbwEtJ8pFnTclsLIcxKxg9lQ50vEYxsw3eEdrjpphUJPyhtGJNzD47mht6gawEUYxoo1oO/h6SUCazQ7m61IWYv/L8Nv5qPi2gNd+mFR+SkHMX/AJfhN/NTAWs9Pc4cvD6nqCyp0z09zhy8PqeoMRBSyX+uynjMD3rVZ5VhyXP/ADZXxmB71qs8gEIQg4bcsxk1LxZeJ2MRhbXUf7XDhBoeZVinpR8GI+FEFHw3OY4b1WmhpwK1ahrPXYOxxmTjBuYv0cSm9EaNy7naKeQgjMLdJdsh+Gz2gtK3SXbIfKM9oILVlCChBXDOH3Sm+V/S1N5OHOJ3Sm+V/S1N2qBw5Ad0pTlh1FWQVb83/dKU5YdRVkEAq6Zyu6c14bfdMVi1EOWWbuemZ2PHhCFciOBbeiUNAxrcRTWCgi1YT6/lRaWqD+KflXRLZoZ4ndxYDBrDnuPRdHWgj5jSSA0EkkAACpJOAAG+VZXIuxzJyUGA7s2tvP5R5LnDmJpzJDyNzcQJJ4jPfs0Ydi4tusZwsbjjwk9Ce6ATQzsTFyy4+OLzDYPKiNr6AU71FOfO1RdgSgOJcYzxqABYyvGS/wA1BEgQSiqVck7M21OQIBGD4gveA3dP9VrkE+5B2XtaQl4RFHXA9+u/E3bgeIupzJVtXtEXkonsFdS57Qu7FEvGjdjfeOpt01PQgrpZ/bIvLu61sdFd3x6Stdndsik/bu61tdCOr0hQs0uiO749JW6DLRnsdEaHFjS1rnVwDnkBo075c0c41ha3Qjq9IQ0xA0tDnBriCWh1Gkt7EkVoSN5ENr5KYGJY8aNNRpNBXVU6NaHyMwKAsia9/GtPTiBTWVodsmip8790F0Tvnefza+AINb3uBIJcCDQgk1BGBBXnZXd8ekr0YTtXpCxsLtXpCDIcS01JNKHFSDmLP1vwm/mo+u0Brv03wn5mN7ZM8/tMUwF/PT3OHLw+p6gtTpnq7nDl4fU9QbCiFpBGkaxUdCIKOS4/5sp4zA961WeVYsmPrsr4zA981WdQCa2Q1vbY21AcaxJaZjMx0mEYr9jPNQt8kJ0qArGt/aVsxojjSG+Zjw4uq4+M7dHwTR3MUE+pKypsZs5KxZd2Be3cnvYjcWO5nAc1UqoQVRjQnMc5jxRzXFrmnSHNNHA84K9yXbIfKM9oJ955bA2GabNMG4mButQjNGPnNoeMOTEku2Q+UZ7QQWrKEFCCuGcM/wBTm+V/S1Nx3EnHnE7pzfK/pam6QgcGb4/1KU5YdRVkVW3N8P6lKcsOoqySAQhCAQhCAQhJtt27LSjL8xGawbwJq93A1gxcUHTaM9DgQnxorrrIbS5x4BqG+d4Dfqq1ZS2y+cmYkw/C+dy3vGDBjeYU5yUt5d5cRLQdcaDDl2mrYdd047z4lN/UNA4U0aoAqSsx1mXpiNMkYQoYht8KIamnCGs9ZRorA5prL2CzobiKOjl0Y8TsGeo1p50DxXHbLw2XjF2gQolfMK7Ezs6k8+HIlkMOLosWGzcgkhodfcTTeoynlIIblOyjcs/rWxy1y3ZxuWf1ra5R9VmorWQthXgoh5WCvVV5KDCAKoW2C8DSg1EKQMxvbJnn9pqYcZ4OgKQMxjBWbO+HAcxOPshTAW89Pc4cvD6nqClOuerucOXh9T1BaIKeS/12V8Zge9arPKsOS/12U8Zge9YrPIBVfym+uTXjMf3rlaBVgym+uTXjMb3rkE35rbe21JNa51YsCkJ+sgD6N5424V1tKeCr3mwt7ak8wONIUekJ+oEn6N3M7DicVYRAhZb2EJ2TiwKC/S/DJ3orMW47wOLTwOKrjKNIisBFCIjQQcCCHioI1q1agvOdYO1rRZFYKQ5l7Yg1CIHjZG9JDvKKCdChBQgrhnE7pTfK/pam4nHnE7pTfK/pam7zoHBm+7pSnLDqKsiq3Zvh/UpTlh1FWRQChfLfLu0JefmIMGYuw2OaGt2KEaAsaTi5pJxJ0qaFXTOX3TmvDb7piDobnItahO2sBpOwQMOPcLW/OPap/wAwjihQB+hNUE6K4FCBdmss7RiCjp6NT/V1z2AEixYjnuLnuLnHS5xLiec4rwgICqAEBCDos6TdHiw4LeyivbDGG+9wFeateZWlloDYbGw2ijWNDWjUGigHQFBeZ2y9lnxEI3MvDdE8t24Z1uPkqeEAvEfsXeCepe14j9i7wT1IK1yfZRuWf1re5aJTso3LP61uKj6rPBWKjUslYhwy5wa0Vc4hoGsuNAOkoNZWE45LJGO8BzqNBuGm+AXlr66nNaL3DWi6pnIiIG1ZEBcL2B3/AKSjMd76PE6cR0ZZ5uCJ1Nod44uWY30miAsFdU3KPhbl7S11TgRTAEio4Kg4rlK1RMTG4Z5iY8SwpGzF/wCX4bfzUdKRcxf+X4TfzUwFrPT3OHLw+p6gpTrnq7nDl4fU9QWiCnkt9dlfGYHvWKzyrBkt9dlfGYHvWqz6AVX8pvrk14zG965WgVX8pvrk14zG965AmlWMzd2/t2ShvcaxGfRRdd9gG6PhNuu5yq5lPjNHb+1p0QXmkOZpDOoRB2s85Jb5QQT0m9lzYW3Ja6B9JCe2ND8JhqW+U28OMhOFCAKEIQVvzid05vlf0tTeAThzid05vlf0tTdCBw5v+6Upyw6irIqt2b7ulKcsOoqyKAVdM5XdOa8NvumKxarnnK7qTXht90xA2kELCygAhCEAhBKy1pJAAq4kAAb5OACCbcydmbHJvjkbqPEND/44W5HrbIpDXBYFnCWloMAf9qG1h4SBujzmp513oEzKW2WSctEmXtLgwDcg0Li5waADxlMB2eOE7c7SiY4dsbv4alsz5WldgQJYHGI8xHeDDFAD5T6+SoehaRxjrQLEr2cYf+Z/WtzknPNIsWn2r/aK7oL7w4VErQwUu5EvbtoNc0G800qAaPbR4IJ0HclIMR1F0ZMx7s5AcT/3A3zwWfqXHk16sNo/EumG3TkrP5hLiFskpKNFBdDhPeLxbuQA0XXFpoXEAmoqccFh0pEZFdCiFkMta130kRjcHlwGgmtLp0axXer8tHFzTG4rOnuznxxOto4zgfWhyLD60Qfkm1RPnOrZD4OwRnhoLi6G2jmO2RgAdfBBrdx3x/dvVxYzSvp+JWa4axaNTEPD5ExOWZidwKKRMxf+X4TfzUfVAKkHMZpm/Db+paYcS1nq7nDl4fU9QUp1z09zhy8PqeoKKIKeS312V8Zge9arPqsOS/12V8Zge9arPIBVgym+uTXjMf3rlZ9Vfym+uTXjMf3rkCastcRiCQQagjAgjQQdawgoLLZFW6J2ThR6i/S5EA3orMHcVcHcTglxQjmZt/YZl0q87iYG5roEZow85tRxhqm5AIQhBW/OJ3Sm+V/S1N1OLOJ3Tm+V/S1N6iBwZvu6Upyw6irIqt2b8/1KU5YdRVj741jpCD0q65yW1tObOGD28fa2aFYi+NY6Qq65yj/U5rw2+6YgbRQgIQCFgrKATmza2Xti0YDSKthkxncULFvr3BzpshS1mMs0BsxNOpiWwW11NF99Ocs6EEroXm+NY6QtU3NshsfEc4XWNc84jQ0EnqQQNnatLZrSiNB3MFrYI4wLz/WcRzJoQuyHGOtE9OOixHxXdlEe6I7je4uPWtUI7pvGOtAoxO2xuVf7RXTJnTzLmi9si8q/2l0Sm/xJKXuaOC6cmZB0eZY1rg0tOyVIr2sg0A3zWi5I5w51phOcDVpII0FpII4iNCpeJmsxE6lNZiLRM+U7SVoxoYpDiuZXEhpDm136BwIC0xXOcS4uN5xqXHFxOvHoTas234EOUgl8XdCG1pDd0++1ovYa+E61xTeWMK67Y4cS/Q3S51BepgSA7Qvmvh+Rf+HmYidfj9vd7uGv8vETMf3cGcqDR8uakjY3MFSTQMLaAV0Dd6OBNNm8t9q2nGmH3ozrxGAFAGtG+GgLRD0L6HjY7Y8Va2ncw8bNet8k2rGoZThzfZXMs0RXRITnsixbpLCLzborUA4O06xoTeW2ShNdJzN7SIoueFUaOaq6zbUbc4jaQs5WVMpO2aNrx2ucI8Mlhq2I0UdiWHGnDoUQ1Wsgg4r23FXlUq5K/XZXxmB71qs+qwZLfXZXxmB71qs8XjWOkKBlVfyn+uTXjMf3rlZ6+NY6Qqw5S/XJrxmN71yBNQhCD3AjOY5r2EhzHBzSN5zTVp5iArN5M2w2clYUw3+9u6HevGD28zgVWEKTcydv3IsSSe6jYlYkOp0RGjdtHG0V8goJlQvN8ax0hF8ax0hBXHOJ3Sm+V/S1NxOLOGf6nN8r+lqbyDNVnZD3x6SsLFEHovPfHpKwePpWKoQZWWCpoBU6hpShZ9jxIppQgcWP7c6eVlWDDggEip6enWs+XkUp+Zd8eC1vM+INeQyXjRBeJDBwiq7RkU/7dvmH4p5NCysU8vI1Rx6GYci3/bt8w/FZ/wCjooGEwKeC4fmniKICfF5D4ehnDI+L95HQ74pDtKSdCBrFvCt3CuPpUlv0OppoepR3lB2LdVT1Ltgz3vbUueXDWtdwQ17g9k3jHWvC3ybTfaaVAcD0HQt7E7ovbYvKv9pbpU4niWmL2yLyr/aW2WOPMkjZMaE9bGyPY6XaYpc2K8XsD2AI3LS3QdZ46JtWPKCNMQoZGBeCfBbunDnDSOdPzKm0thl3EGjn/Rt11dpI4mhx5l5fOzZIvTFjnUy3cXHXptkv6QjmK269zag3SW1Gg3SRUcCxThWxkq+gox3QfQu2VsONEButFWipaTR/BQHiXoWvWkbtLLEWtOqwTi1aS2i6JeG57gxjSXE0DQMSeLeShP5PzEOGYjoe5GJoQ4tGsgb3ClslKzETMRMoilrRuI2Rl0WNZUeZhvbAhl5bGJIBaKVbgTeI4VzkJ75oNEz4bfzXLl5pw4bZI86/6Ur1W0aVpZHzrW3nSzuMFjsOEA1XNk1ZjIsV8KMHAhtQKlpBBFQRTUVPEQilCaVwGNDrw6NCZ9tSTWTLXXAH3SL40OYRjXUb13DjovM4/wDVbZYmto1P000xx4iYN0ZJS3/k8/8AZev+lYHfRPxD8Eu0WVf4jJ7tHap7EL/pWB30T8QrwckZbXE8/wDZLxWQnxGT3O1T2N2LkdApuXPB4XVHUm/aOT7oejoOg8TlINV4iwmvbdcKj/3Qr15OSJ8ztW2Ckx6Ipewg0IodRQnta1hAitLzfWamrN2c5uI3TeDSOMLfi5FbsmTBavp6OQvPfHpKL5749JXhZXdwCwUFCDKF6htLjQCpOgBLlmWCXbotLugNHScVS+StI3K9Mdr+hKlpN7+xGHfHRza06bIybAo53Sey5h/aliSkWw8bji7WQ2g4hVduynvHer8V5+XkWv4jxDdjwVr5nzIgQWsFGgAf+6V7C17Ke8d6vzLIiHvHer8yy6l3bKrBXjZf9Her8UB57x1PJ+ZNDYVgLyYh7x3q/MsbKd5jvV+ZNSNhCaNr2eN0x2g4tPBvFOoxDXsHer8y0zMIPFHQ3Hh3NRxGqtSZrO1bRExqUZxrPcx1HaNY0FbgQObUnhHsd9dyKjU66PzSfGyaea3W04LwI616OPkxPzMV+PMfKQo4pFjDVFf7RShYFn7YjCFUgkEtDaXnOBG5aN80JNP9VrtWSiwXbM9ho+l/DsXjAu4naecjeStBn4JLrsVgG1g0Yhu6pox31p6omNw4TXU6ksWTZhlJ4w4oc07BfAeAHC+9rRUAnh5jjQ1A05wZmG8MaIm7huqWUNCIjQQ6ujCgHlJu2PMMEZhMRooa1LgKUBIxPCAlOzosKIyM+LPwA58K7dfs14UBABuwiDgB2JKyW42+RGbfpDvGbWLt69XBDn47boEw2hazQ925D/7XU0XbovDew0qQ7DYx0NkdpcTEYK3nl5bQmrcdTryjkyUD7/LebN//AJ1I0rtSThtgm0ZZwbeo9sQODgXudjcqGmh0V6Vx/qWO1scdHv8Apfh2it/5GNaE86Vn4r4YGDzgdBDwHObwVJ0hSvJSTIsk2cbEFHgEMIGhxAuk17LGtKaFFOUcNm3r2zQnsiuhRL7HXmtYSGm/oIcLhJbpoRrT+MeXg/RiagOa0kNe2NBuubU3TQO3OFMDo9K5cvDvFS3T1W1r9evj2l14+TV7R1aje/2jC2IIhzEWG3sWxHADUK1A5q0ThzbWgIDJh5Y996JQBlP7RU1qaDsgkzLKMx0drYD2xXuBNITg8AucXAFzdySKmtCUtWDIOl4Ih0Bcauca/wBx0729gOaq08iItx+m/wBYj/ThjrvLOvTyez7Ul4kIkvIqOxIIeDvUG+a6kgzMw6MWveKFrLtBr3yeErRefvs9b9kXn94PO/ZeVj49cfo1xDZRBWq+7vB5w+Czed3nrfsu2ltthCFqvu7wed+yyHu70ed+yaNthCAtd53eDzv2Rsj+89YfBNSbbEnTtltfi3B2rePwXbfd3nrfssh7tNz0/skRMJMi0bHBJqLr/QeMb/GkKYl3QzRw4jvHnUmzEHZBR0PiN7EcINEg2jZzmDdNDmk00j0rZi5Fo8SzZMEW8wZayu20ZG5Rw7E4UrWh3uZcVFvraLRuGK1ZrOpddlxg2JV2AIIrvA4H8k+bEnWXLt4Ag9IO+soWbk44t5auNbxoomZZ34WNts78IQsXahq2Nts74I22zvx6UIU9qDqG22d8PSgzbO+Hp+CEJGKDqG22d96D8EbbZ33oKEJ2oVm8wNss770H4IM0zX6ChCiccJ65BmWa/QfgstmW6/QfgsIUdEG5Y2ww4Vw1UPwSfFsmSdiYLeYOb7NEIV67r8szCltW9Yav4HJaNhHTF/IrIsOR+xHTF+KEKe7f7pO3T2gfwOR+xHTF+KP4HI/Yjpi/FCFPcv8AdJ26e0D+ByX2Hpi/FH8DkvsB/wDb8UIUd2/3T/lPbp7Q7pSDAhdrhhtdTDXnNKnnXTthvD5rvghCpaOqdzO14npjw8mYbrPmu+CBMN4fNd8EIVemEdUs7Ybw+a74LG2W6z5rvghCnphO2TMs4fNd8EbYbw+a/wCCwhR0wibSztlv+3mu+CNst373mP8AgsITpgi0jbLeHzH/AARthv8At5j/AIIQo6YTsbZb/t5j/gk6251lwMxqSD2LhQc4WUK1KxMkz4M215xrhcYa41OnCm8ksrCF61KxWNQ8y9ptO5f/2Q=='
    },
    {
      id: 5,
      color: 'Bạc',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBSmEOVnXQMwqa9TCOAlbXUejDj95aMOXoXg&s',
    }
  ]
  // thực hiện ngày khi gọi tới trang này 
  useEffect(() => {
    if (id) {
      getProductDetail(id);
      getComment(id)
    }
  }, [id]);
  const [productDetail, setProductDetail] = useState([]);
  const getProductDetail = (id) => {
    axios.post(`${api}/detail`, { id: id })
      .then((response) => {
        setProductDetail(response.data);

      })
      .catch((error) => {
        console.log('lỗi', error);
      });
  };

  //lấy ra tất cả các bình luận về sản phẩm
  const [listFeedback, setListFeedback] = useState([]);
  const getComment = (id) => {
    axios.post(`${api}/getComment`, { id: id })
      .then((response) => {
        setListFeedback(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.log('lỗi', error);
      });
  };
  // thêm sản phẩm vào giỏ hàng
  const addCart = () => {
    setLoading(true)
    const cart = {
      idUser: user.id,
      idProduct: productDetail._id,
      name: productDetail.name,
      image: productDetail.image,
      quantity: quantity,
      realPrice: productDetail.realPrice,
    }
    try {
      axios.post(`${api}/addCart`, cart)
        .then((res) => {
          if (res.data.status) {
            setLoading(false)
            alert("Sản phẩm đã được thêm vào giỏ hàng")
            return;
          }
          else {
            alert("Sản phẩm đã Có trong giỏ hàng");
          }

        })
    } catch (error) {
      console.log("lỗi:" + error)
    }
  }
  //mua ngay sản phẩm
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const buyProduct = () => {
    setLoading(true)
    const cart = {
      idUser: user.id,
      idProduct: productDetail._id,
      name: productDetail.name,
      image: productDetail.image,
      quantity: quantity,
      realPrice: productDetail.realPrice,
    }
    try {
      axios.post(`${api}/addCart`, cart)
        .then((res) => {
          setTimeout(() => {
            setLoading(false)
            navigate('/user/cart')
          }, 3000)
        })
    } catch (error) {
      console.log("lỗi:" + error)
    }
  }

  // thay đổi hình ảnh hiển thị
  const [imageAvt, setImageAvt] = useState('')
  const loadImg = (img) => {
    setImageAvt(img)
  }
  //Lấy lấy dữ liệu của user khi comment sau đó thêm vào database
  const [feedback, setFeedback] = useState('')
  const handleComment = (e) => {
    e.preventDefault();
    const comment = {
      text: feedback,
      name: user.name,
      image: imageUrl,
      idUser: user.id,
      idProduct: productDetail._id,
    }
    setLoading(true)
    try {
      axios.post(`${api}/comment`, comment)
        .then((res) => {
          setTimeout(() => {
            alert('Đánh giá của bạn đã được ghi nhận')
            setLoading(false)
            setFeedback('')
            setImageUrl('')
            getComment(comment.idProduct)
          }, 3000)
        })
    } catch (error) {
      console.log(error)
    }
  }
  //chọn hình ảnh
  const [imageUrl, setImageUrl] = useState('');
  const uploadImg = (selectedImage) => {
    const formData = new FormData();
    formData.append('file', selectedImage);
    formData.append('upload_preset', 'nxl7uozr');
    axios.post("https://api.cloudinary.com/v1_1/dfv0n3vas/image/upload", formData)
      .then((res) => {
        const uploadedImageUrl = res.data.secure_url;
        setImageUrl(uploadedImageUrl);
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      });
  };
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      uploadImg(selectedImage);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3000)
    }

  };



  //phóng to hình anhr của đánh giá
  const [zoomComment, setZoomComment] = useState(false)
  const [imageZoom, setImageZoom] = useState('')

  const zoom = (image) => {
    if (image !== '') {
      setImageZoom(image)
      setZoomComment(!zoomComment)
    } else {
      alert('Click cái gì ?')
    }

  }
  return (
    <div className='flex flex-col items-center px-2'>
      {/* Load khi có sự kiện xảy ra  */}
      {
        loading &&
        <div className="flex justify-center items-center w-[100vw] h-[100vh] fixed bg-gray-50 bg-opacity-50 z-20 left-0 top-0 bottom-0 right-0">
          <BeatLoader
            color={'#DB142C'}
            loading={loading}
            size={10}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      }

      <div className='container bg-gray-50 mt-2 rounded-md p-3'>
        <div className=' lg:flex gap-4'>


          {/* list ảnh của sản phẩm  */}
          <div className='lg:w-[50%] lg:p-2  '>
            <div className='p-4 flex justify-center items-center bg-gray-100 rounded-md h-[200px] sm:h-[300px] xl:h-[350px]'>
              <img src={imageAvt === '' ? productDetail.image : imageAvt} alt="" className=' rounded-lg h-[180px] sm:h-[250px] md:h-[280px]  lg:h-[280px] xl:h-[320px]' />
            </div>
            <div className='p-2 flex justify-normal gap-2 '>
              <div onClick={() => { loadImg(productDetail.image) }}>
                <img src={productDetail.image} alt="" className='h-[40px] rounded-md md:h-[60px] lg:h-[80px]  border' />
              </div>
              {
                data.map((data, index) => {
                  return (
                    <div onClick={() => { loadImg(data.image) }}>
                      <img key={index} src={data.image} alt="" className='h-[40px] rounded-md md:h-[60px] lg:h-[80px] border' />
                    </div>
                  )
                })
              }


            </div>
          </div>



          {/* Thông tin của sản phẩm  */}
          <div className='lg:w-[50%] lg:p-2 '>
            <h3 className='font-semibold pb-3 md:text-[18px] '>{productDetail.name}</h3>

            <div className='flex items-center pb-3 text-[12px] md:text-[14px] lg:text-[18px]'>
              <FaStar className=' mr-1 text-yellow-500' />
              <FaStar className=' mr-1 text-yellow-500' />
              <FaStar className=' mr-1 text-yellow-500' />
              <FaStar className=' mr-1 text-yellow-500' />
              <FaStar className=' mr-1 text-yellow-500' />
              <p className=''>20 đánh giá</p>
            </div>

            {/* giá sản phẩm  */}
            <div className='pb-3 flex items-center'>
              <h3 className='text-red-600 font-bold mr-2'>{formatPrice(productDetail.realPrice)}đ</h3>
              <h3 className='text-gray-400 font-medium mr-2 text-13'><del>{formatPrice(productDetail.price)}đ</del></h3>
            </div>
            {/* hàng còn trong kho  */}
            <div className='pb-3 flex items-center'>
              <h3 className=' font-medium text-13'>Kho: {formatPrice(productDetail.warehouse)} sản phẩm</h3>
            </div>

            {/* số lượng sản phẩm ? */}
            <div className='flex  items-center my-2'>
              <CiCircleMinus size={25} onClick={handleMinus} />
              <input type="" value={quantity} className='text-center text-19 w-[50px] px-3' />
              <CiCirclePlus size={25} onClick={handlePlus} />
            </div>
            {/* lựa chọn phiên bản */}
            <div className='my-2'>
              <h1 className='font-bold mb-1'>Lựa chọn phiên bản</h1>
              <div className='pb-3 gap-3 grid grid-cols-3 md:grid-cols-5 xl:grid-cols-6'>

                {
                  data.map((data) => {
                    return <div onClick={() => handleSelect(data.id)} className={`text-center p-2 border border-gray-400 rounded-xl hover:bg-red-200 ${select === data.id ? 'border-red-600 bg-red-200' : ''}`}>
                      <p className='font-medium text-[11px]'>5G 256GB - {data.id}</p>
                      <p><h3 className='text-gray-500 font-medium mr-2 text-[11px]'>{formatPrice(productDetail.price)}đ</h3></p>

                    </div>
                  })
                }

              </div>

            </div>
            {/* lựa chon màu  */}
            <div className='my-2'>
              <h1 className='font-bold mb-1'>Lựa chọn Màu</h1>
              <div className='pb-3 gap-3 grid grid-cols-3 md:grid-cols-5  xl:grid-cols-6'>

                {
                  data.map((data) => {
                    return <div onClick={() => handleSelectColor(data.id)} className={`text-center p-2 border border-gray-400 rounded-xl hover:bg-red-200 ${selectColor === data.id ? 'border-red-600 bg-red-200' : ''}`}>
                      <p className='font-medium text-13'>{data.color}</p>
                    </div>
                  })
                }

              </div>

            </div>
            {/* mua hàng, thêm vào giỏ hàng */}
            <div className='pb-3 flex  gap-3'>
              <div onClick={buyProduct} className='text-center text-white bg-red-600 border border-gray-400 w-[75%] md:w-[50%] lg:w-[60%]  p-2 rounded-xl hover:bg-red-500 cursor-pointer'>
                <h3 className='text-[18px] font-bold'>Mua ngay</h3>
                <h3 className='text-[11px]'>(Giao nhanh từ 2 giờ hoặc nhận tại cửa hàng)</h3>
              </div>
              <div onClick={() => addCart()} className='cursor-pointer text-red-600 w-[25%] md:w-[20%] border border-red-600  flex flex-col justify-center items-center p-2 rounded-xl hover:bg-gray-200'>
                <LiaCartPlusSolid className='text-[30px]' />
                <p className='text-[10px] hidden sm:block'>Thêm vào giỏ</p>
              </div>
            </div>
          </div>
        </div>
        <hr className='m-2' />


        {/* thông số  của sản phẩm  */}
        <div className=''>

          <div className=' '>
            <h1 className='font-bold mb-1'>Thông tin sản phẩm</h1>
            <div className=' p-2 bg-red-100 rounded-xl'>
              <div className='flex pb-4 '>
                <div className='text-15 sm:text-13' dangerouslySetInnerHTML={{ __html: productDetail.description }} />
              </div>
            </div>
          </div>

        </div>
        <hr className='m-2' />


        {/* Đánh giá sản phẩm  */}
        <div className='p-2 bg-white'>
          <div className=' '>
            <h1 className='font-bold mb-1'>Đánh giá sản phẩm</h1>
            <div className='p-3'>

              <form onSubmit={(e) => handleComment(e)}>
                {/* text  */}
                <div className=''>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    style={{ outline: 'none' }}
                    className='border w-full p-2'
                    placeholder='Nhập đánh giá của bạn tại đây...'
                    required>

                  </textarea>
                </div>
                {/* hình ảnh  */}
                <div className=''>
                  <h6 className='font-bold'>Hình ảnh sản phẩm:</h6>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className=' my-2'
                  />
                  <div className='w-[40%]'>
                    {imageUrl && <img src={imageUrl} alt="Uploaded" className='h-[100px]' />}
                  </div>
                </div>
                <div className='flex justify-end'>
                  <button type="submit" className='p-2 bg-red-400 rounded-md font-bold'>Bình luận</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <hr className='m-2 ' />



        {/* Tất cả các đánh giá về sản phẩm  */}
        <div className='p-2 bg-white'>
          <div className=' '>
            <h1 className='font-bold mb-1'>Tất cả đánh giá về sản phẩm</h1>
            <div className={listFeedback.length === 0 ? '' : ''}>
              {
                listFeedback.map((data, index) => {
                  return (
                    <div key={index} className='m-1 bg-red-100 p-2 rounded-md'>
                      <div className='flex items-center gap-2'>
                        <img
                          className='h-[40px] w-[40px] rounded-full cursor-pointer'
                          src="data:image/png;base64,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"
                          alt="" />
                        <div className='text-13'>
                          <h6>{data.name}</h6>
                          <h6>{new Date(data.createdAt).toLocaleString('vi-VN', {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                          })}</h6>
                        </div>
                      </div>
                      <hr className='border-black my-1' />
                      <div className=''>
                        <h6 className='text-13'>{data.text}</h6>
                        <img
                          onClick={() => zoom(data.image)}
                          src={data.image} alt="" className='h-[40px] cursor-pointer' />
                        {
                          zoomComment &&
                          <div onClick={zoom} className='flex justify-center items-center w-[100vw] h-[100vh] fixed bg-gray-50 bg-opacity-50 z-20 left-0 top-0 bottom-0 right-0'>
                            <img src={imageZoom} alt="" className=' h-[300px] sm:h-[500px] ' />
                          </div>
                        }
                      </div>
                    </div>
                  )
                })
              }

            </div>
            {
              listFeedback.length === 0 ? (<div>Hiện tại chưa có đánh giá nào về sản phẩm này</div>) : ''
            }
          </div>
        </div>
      </div>
      <hr className='m-2' />
      <div>
      
      </div>
    </div >

  );
}
export default Detail