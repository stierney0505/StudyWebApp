/* eslint-disable react/no-unknown-property */
import InputButton from '../../components/button/button';
import { LTxt, MTxt } from '../../components/text/text';
import './not-found.css'

const NotFoundPage = () => {

    return (
        <>
            <div className="NF-container">
                <div className="NF-text">
                    <LTxt id="NF-header">We are unable to find this page</LTxt>
                    <MTxt id="NF-text">This resource may have been moved, deleted, re-named, or temporarily unavailable.</MTxt>
                    <MTxt id="NF-text">Make sure the URL in the address bar is correctly spelled. You can also search for content in the search bar in this page&apos;s header.</MTxt>
                    <InputButton 
                        text={"Back To Last Page"}
                        id="nav-last-page"
                        URL="/"
                    />
                </div>
                <div className="NF-Graphic">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="2000" zoomAndPan="magnify" viewBox="0 0 1500 1124.99995" height="200" preserveAspectRatio="xMidYMid meet" version="1.0"><defs><clipPath id="7268a01e6e"><path d="M 288 146.011719 L 1211 146.011719 L 1211 959 L 288 959 Z M 288 146.011719 " clip-rule="nonzero"/></clipPath><clipPath id="01ff42285d"><path d="M 1017 55 L 1394 55 L 1394 712 L 1017 712 Z M 1017 55 " clip-rule="nonzero"/></clipPath><clipPath id="ed7c0f1f30"><path d="M 1518.820312 168.023438 L 1394.117188 713.449219 L 892.558594 598.773438 L 1017.265625 53.347656 Z M 1518.820312 168.023438 " clip-rule="nonzero"/></clipPath><clipPath id="c5ba3ebb7f"><path d="M 1518.820312 168.023438 L 1394.117188 713.449219 L 892.558594 598.773438 L 1017.265625 53.347656 Z M 1518.820312 168.023438 " clip-rule="nonzero"/></clipPath><clipPath id="3737081fed"><path d="M 197.066406 286 L 261 286 L 261 352 L 197.066406 352 Z M 197.066406 286 " clip-rule="nonzero"/></clipPath><clipPath id="65da7a9d54"><path d="M 466 102 L 497.816406 102 L 497.816406 136 L 466 136 Z M 466 102 " clip-rule="nonzero"/></clipPath></defs><path fill="#fdca40" d="M 2.632812 913.613281 C 3.492188 928.300781 12.714844 975.03125 52.566406 1013.085938 C 56.941406 1017.308594 103.515625 1060.363281 170.484375 1059.113281 C 247.144531 1057.628906 258.316406 999.960938 324.582031 992.613281 C 416.480469 982.457031 447.972656 1087.558594 525.253906 1077.242188 C 612.148438 1065.601562 698.03125 915.800781 654.738281 826.636719 C 633.25 782.332031 583.394531 759.355469 572.765625 755.136719 C 528.769531 737.789062 501.578125 742.789062 462.664062 738.882812 C 348.652344 727.550781 339.664062 660.582031 249.097656 655.347656 C 152.980469 649.800781 81.167969 720.597656 71.945312 729.976562 C 61.164062 740.835938 -3.304688 814.683594 2.632812 913.613281 Z M 2.632812 913.613281 " fill-opacity="1" fill-rule="nonzero"/><g clip-path="url(#7268a01e6e)"><path fill="#531cb3" d="M 694.992188 181.96875 C 645.609375 268.292969 523.625 484.292969 425.609375 657.867188 L 295.9375 887.308594 C 284.269531 907.847656 288.625 924.089844 292.25 931.941406 C 299.605469 947.839844 315.296875 955.769531 327.519531 957.910156 L 329.984375 958.332031 L 1166.804688 958.351562 L 1165.054688 958.292969 C 1178.179688 959.097656 1195.605469 954.371094 1205.128906 938.710938 C 1211.21875 928.65625 1215.59375 911.554688 1201.738281 887.246094 L 942.648438 434.554688 L 799.273438 184.152344 C 781.3125 152.753906 760.476562 146.144531 746.164062 146.144531 C 732.1875 146.144531 711.960938 152.355469 695.007812 181.96875 L 694.988281 181.96875 Z M 476.625 687.605469 C 574.621094 514.09375 696.546875 298.171875 745.851562 211.984375 L 746.441406 211.042969 C 747.070312 212.003906 747.683594 212.882812 748.394531 214.144531 L 891.808594 464.59375 C 891.808594 464.59375 1120.617188 864.417969 1140.195312 898.601562 L 357.371094 898.582031 L 476.617188 687.605469 " fill-opacity="1" fill-rule="evenodd"/></g><path fill="#531cb3" d="M 749.675781 855.257812 C 775.027344 855.257812 795.570312 833.988281 795.570312 807.757812 C 795.570312 781.546875 775.027344 760.28125 749.675781 760.28125 C 724.285156 760.28125 703.742188 781.546875 703.742188 807.757812 C 703.742188 833.988281 724.285156 855.257812 749.675781 855.257812 " fill-opacity="1" fill-rule="evenodd"/><path fill="#531cb3" d="M 749.675781 389.960938 C 786.300781 389.960938 819.953125 424.605469 815.992188 458.566406 L 784.625 697.453125 C 781.570312 718.320312 768.972656 733.597656 749.671875 733.597656 C 730.375 733.597656 717.738281 718.320312 714.722656 697.453125 L 683.339844 458.566406 C 679.355469 424.605469 713.027344 389.960938 749.675781 389.960938 " fill-opacity="1" fill-rule="evenodd"/><g clip-path="url(#01ff42285d)"><g clip-path="url(#ed7c0f1f30)"><g clip-path="url(#c5ba3ebb7f)"><path fill="#fdca40" d="M 1392.667969 700.957031 C 1382.554688 692.777344 1357.890625 675.285156 1342.007812 657.964844 C 1309.367188 626.789062 1280.003906 583.09375 1272.019531 543.410156 C 1269.996094 530.425781 1271.15625 518.253906 1274.824219 506.945312 C 1285.257812 508.25 1295.730469 508.855469 1306.257812 508.101562 C 1313.527344 507.433594 1320.949219 506.800781 1327.792969 504.164062 C 1335.84375 500.800781 1342.894531 495.425781 1349.625 490.015625 C 1356.453125 484.339844 1363.363281 478.140625 1367.113281 469.929688 C 1373.351562 455.382812 1369.691406 444.269531 1354.886719 437.886719 C 1320.121094 422.367188 1282.164062 460.65625 1267.980469 489.570312 C 1267.230469 491.023438 1266.574219 492.453125 1265.902344 493.921875 C 1261.925781 493.304688 1258.046875 492.625 1254.214844 491.914062 C 1233.117188 488.296875 1209.410156 482.460938 1194.015625 475.738281 C 1150.359375 457.976562 1112.921875 426.121094 1126.539062 382.765625 C 1133.027344 353.300781 1157.390625 335.699219 1186.847656 317.679688 C 1214.226562 302.183594 1253.832031 274.339844 1235.164062 238.453125 C 1214.695312 208.441406 1179.320312 195.027344 1148.164062 179 C 1117.289062 163.207031 1086.246094 148.871094 1062.597656 126.03125 C 1048.242188 111.851562 1036.9375 91.253906 1029.535156 72.503906 C 1027.726562 67.847656 1026.558594 62.960938 1025.464844 58.09375 C 1025.148438 57.109375 1024.433594 56.238281 1023.507812 55.734375 C 1020.523438 54.054688 1016.53125 57.132812 1017.710938 60.523438 C 1019.824219 72.03125 1024.613281 82.738281 1029.851562 93.128906 C 1035.699219 105.03125 1042.5625 116.5 1051.285156 126.566406 C 1063.554688 141.3125 1079.78125 152.050781 1096.023438 161.964844 C 1121.632812 177.511719 1148.949219 189.957031 1175.425781 203.871094 C 1197.113281 214.738281 1219.914062 230.558594 1227.464844 246.472656 C 1240.667969 282.0625 1187.210938 301.167969 1154.34375 325.933594 C 1140.339844 336.417969 1127.378906 349.429688 1120.078125 365.523438 C 1110.023438 390.765625 1108.050781 416.855469 1125.058594 439.628906 C 1152.113281 477.597656 1202.097656 494.0625 1246.171875 502.347656 C 1251.316406 503.316406 1256.5 504.292969 1261.714844 505.152344 C 1255.25 526.515625 1257.074219 549.105469 1265.960938 570.273438 C 1276.300781 600.382812 1294.277344 626.917969 1315.328125 650.574219 C 1332.808594 670.007812 1351.515625 688.429688 1373.136719 703.230469 C 1377.527344 705.855469 1381.410156 710.15625 1386.449219 711.226562 C 1391.667969 711.875 1395.640625 705.421875 1392.667969 700.957031 Z M 1297.625 469.808594 C 1315.589844 451.824219 1334.792969 439.703125 1353.800781 451.367188 C 1354.019531 451.5 1354.269531 451.683594 1354.488281 451.816406 C 1355.269531 452.410156 1356.039062 453.046875 1356.75 453.75 C 1356.941406 454 1357.082031 454.117188 1357.214844 454.269531 C 1357.246094 454.320312 1357.316406 454.375 1357.34375 454.425781 C 1357.34375 454.425781 1357.375 454.472656 1357.375 454.472656 C 1358.15625 457.980469 1358 456.65625 1357.136719 461.699219 C 1356.941406 462.195312 1356.703125 463.054688 1356.519531 463.679688 C 1350.832031 475.816406 1340.722656 482.367188 1327.960938 491.054688 C 1315.699219 497.570312 1297.757812 497.792969 1279.378906 495.753906 C 1283.863281 486.507812 1290.085938 477.859375 1297.625 469.808594 Z M 1297.625 469.808594 " fill-opacity="1" fill-rule="nonzero"/></g></g></g><g clip-path="url(#3737081fed)"><path fill="#8c52ff" d="M 197.640625 321.226562 C 197.621094 315.867188 199.230469 311.28125 203.546875 302.066406 C 210.261719 287.730469 226.308594 281.421875 241.207031 289.980469 C 267.234375 304.933594 267.269531 345.898438 236.964844 350.640625 C 214.230469 354.195312 197.179688 336.734375 197.640625 321.226562 Z M 197.640625 321.226562 " fill-opacity="1" fill-rule="nonzero"/></g><path fill="#8c52ff" d="M 357.5625 227.898438 C 357.148438 210.042969 372.257812 193.566406 392.617188 199.429688 C 418.601562 206.914062 421.527344 240.972656 397.734375 249.574219 C 395.5625 250.355469 393.425781 251.148438 391.398438 252.292969 C 374.648438 261.742188 356.730469 246.398438 357.5625 227.898438 Z M 357.5625 227.898438 " fill-opacity="1" fill-rule="nonzero"/><path fill="#8c52ff" d="M 248.851562 545.011719 C 239.773438 541.9375 242.644531 535.886719 240.625 530.027344 C 235.886719 516.273438 243.679688 501.609375 256.910156 498.261719 C 271.464844 494.578125 284.253906 504.261719 286.78125 516.796875 C 290.296875 534.257812 270.785156 552.441406 248.851562 545.011719 Z M 248.851562 545.011719 " fill-opacity="1" fill-rule="nonzero"/><path fill="#8c52ff" d="M 380.738281 406.753906 C 378.472656 401.085938 381.113281 399.320312 383.011719 392.832031 C 387.796875 376.453125 406.734375 372.152344 413.933594 378.199219 C 418.558594 382.085938 426.515625 384.699219 427.121094 396.835938 C 428.433594 423.152344 389.589844 428.902344 380.738281 406.753906 Z M 380.738281 406.753906 " fill-opacity="1" fill-rule="nonzero"/><path fill="#8c52ff" d="M 308.789062 60.53125 C 309.070312 72.5625 296.429688 85.15625 280.765625 82.21875 C 256.398438 77.648438 259.585938 40.378906 286.476562 38.707031 C 298.929688 37.929688 309.472656 48.996094 308.789062 60.53125 Z M 308.789062 60.53125 " fill-opacity="1" fill-rule="nonzero"/><g clip-path="url(#65da7a9d54)"><path fill="#8c52ff" d="M 497.589844 119.128906 C 497.5 132.253906 479.566406 141.070312 469.417969 129.945312 C 467.171875 127.484375 466.082031 124.59375 466.574219 121.277344 C 466.945312 118.773438 465.929688 106.117188 480.765625 102.933594 C 488.019531 101.375 497.984375 109.128906 497.589844 119.128906 Z M 497.589844 119.128906 " fill-opacity="1" fill-rule="nonzero"/></g></svg>
                </div>
            </div>
        </>
    )
}

export default NotFoundPage;