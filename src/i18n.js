import React from 'react';

// English source copy is the stable message key. Catalog names are never translated.
const rows = `
Your face is too small in the uploaded image. Crop the existing photo closer so your face fills most of the frame.|사진 속 얼굴 영역이 너무 작습니다. 다시 촬영할 필요 없이 기존 사진을 얼굴 중심으로 더 가깝게 잘라주세요.|El rostro ocupa poco espacio. Recorta la foto existente para que el rostro llene la mayor parte del encuadre.
Part of your face is outside the uploaded image. Choose a crop that includes your entire forehead and chin.|얼굴 일부가 사진 밖으로 잘렸습니다. 이마와 턱 전체가 포함된 사진을 선택하세요.|Parte del rostro queda fuera de la imagen. Incluye toda la frente y la barbilla en el recorte.
YouCam did not detect a face in the uploaded image. Check the photo preview and try a closer crop.|YouCam이 사진에서 얼굴을 찾지 못했습니다. 미리보기를 확인하고 얼굴 중심으로 잘라주세요.|YouCam no detectó un rostro. Revisa la vista previa e intenta un recorte más cercano.
YouCam reported insufficient lighting in the uploaded image.|YouCam이 사진의 조명이 부족하다고 응답했습니다.|YouCam indicó que la iluminación de la imagen es insuficiente.
YouCam reported that the uploaded image resolution is too low.|YouCam이 사진 해상도가 너무 낮다고 응답했습니다.|YouCam indicó que la resolución de la imagen es demasiado baja.
YouCam could not decode the uploaded image. Try saving it as a JPG before uploading.|YouCam이 사진 파일을 읽지 못했습니다. JPG로 저장한 뒤 올려주세요.|YouCam no pudo decodificar la imagen. Guárdala como JPG y vuelve a subirla.
YouCam could not retrieve the uploaded image. Please retry the analysis.|YouCam이 업로드한 사진을 가져오지 못했습니다. 분석을 다시 시도해주세요.|YouCam no pudo recuperar la imagen subida. Reintenta el análisis.
YouCam could not complete this analysis. This does not establish that your photo is unsuitable. Please retry or share this error code with support.|YouCam이 분석을 완료하지 못했습니다. 사진이 잘못되었다는 뜻은 아닙니다. 다시 시도하거나 표시된 오류 코드를 알려주세요.|YouCam no pudo completar el análisis. Esto no significa que tu foto sea inadecuada. Reintenta o comparte el código de error con soporte.
Your browser could not read this photo. Save it as a JPG and upload it again.|브라우저가 사진을 읽지 못했습니다. JPG로 저장한 뒤 다시 올려주세요.|El navegador no pudo leer la foto. Guárdala como JPG y vuelve a subirla.

Language|언어|Idioma
Your uploaded selfie|업로드한 셀카|Tu selfie subida
Illustrated demo face|데모 얼굴 일러스트|Ilustración de rostro de demostración
SEOUL INSPIRED. YOU CENTERED.|서울에서 영감을, 당신에게 초점을.|INSPIRADO EN SEÚL. CENTRADO EN TI.
Bag|장바구니|Bolsa
Your glow journey|나만의 뷰티 여정|Tu recorrido de belleza
Your selfie|내 셀카|Tu selfie
Skin story|피부 리포트|Tu piel
Your matches|맞춤 추천|Tus recomendaciones
Try a little color|메이크업 체험|Prueba un poco de color
YOUCAM LIVE RESULTS|YOUCAM 실제 분석 결과|RESULTADOS REALES DE YOUCAM
INTERACTIVE DEMO|체험 데모|DEMO INTERACTIVA
Photo processed by YouCam|YouCam으로 분석한 사진|Foto procesada por YouCam
Sample mode · Photos stay in this tab|샘플 모드 · 사진은 이 탭에만 보관됩니다|Modo de muestra · Las fotos permanecen en esta pestaña
A LITTLE SCIENCE. A LOT OF SEOUL.|과학을 더한 서울의 뷰티 감각.|UN POCO DE CIENCIA. MUCHO DE SEÚL.
Your glow,|당신의 빛나는 피부,|Tu luminosidad,
decoded.|그 비밀을 알아보세요.|descifrada.
Meet your skin. Find your K-beauty ritual.|내 피부를 알고, 나만의 K-뷰티 루틴을 만나세요.|Conoce tu piel. Encuentra tu rutina de K-beauty.
Try on a new shade of you.|새로운 컬러로 나를 표현해 보세요.|Prueba un nuevo tono que te represente.
01 Scan|01 분석|01 Analiza
02 Match|02 추천|02 Descubre
03 Play|03 체험|03 Prueba
Designed for the YouCam API Hackathon|YouCam API 해커톤을 위해 제작|Creado para el hackathon de YouCam API
Skin AI + Makeup Virtual Try-On|피부 AI 분석 + 가상 메이크업 체험|IA de piel + prueba virtual de maquillaje
YOUR SELFIE|내 셀카|TU SELFIE
MEET YOUR DEMO MUSE|데모 모델을 만나보세요|CONOCE A TU MODELO DE DEMOSTRACIÓN
A fresh face. A fresh start.|새로운 피부 이야기의 시작.|Un rostro fresco. Un nuevo comienzo.
Natural light, no filters. Your glow is enough.|필터 없이 자연광에서 촬영하세요. 있는 그대로면 충분해요.|Luz natural, sin filtros. Tu luminosidad es suficiente.
Change selfie|셀카 바꾸기|Cambiar selfie
Take or upload a selfie|셀카 촬영 또는 업로드|Tomar o subir una selfie
Allow this selfie to be sent to YouCam for skin analysis and makeup try-on.|피부 분석과 가상 메이크업 체험을 위해 이 셀카를 YouCam에 전송하는 데 동의합니다.|Permito enviar esta selfie a YouCam para analizar mi piel y probar maquillaje.
Live processing uses your API credits. The demo option keeps your photo in this tab.|실제 분석은 API 크레딧을 사용합니다. 데모에서는 사진을 이 탭에만 보관합니다.|El procesamiento real usa créditos de API. La demo conserva tu foto en esta pestaña.
Analyze with YouCam →|YouCam으로 분석하기 →|Analizar con YouCam →
Live API unavailable. Start the API server or explore the demo.|실제 분석 API를 사용할 수 없습니다. API 서버를 실행하거나 데모를 이용하세요.|La API no está disponible. Inicia el servidor de API o explora la demo.
Processing your skin story…|피부 리포트를 준비하고 있어요…|Preparando el informe de tu piel…
Explore my sample report →|샘플 리포트 보기 →|Ver mi informe de muestra →
Just exploring? Try the demo →|먼저 데모 체험하기 →|¿Solo exploras? Prueba la demo →
◎ You choose: private demo or YouCam processing.|◎ 내 기기에서 데모 체험 또는 YouCam 분석을 선택하세요.|◎ Tú eliges: demo privada o procesamiento con YouCam.
Preparing your skin story…|피부 리포트를 준비하고 있어요…|Preparando el informe de tu piel…
Preparing and uploading your photo…|사진을 준비하고 업로드하고 있어요…|Preparando y subiendo tu foto…
YouCam is processing your photo…|YouCam이 사진을 분석하고 있어요…|YouCam está procesando tu foto…
01 / YOUR SKIN STORY|01 / 내 피부 리포트|01 / TU PIEL
A little insight.|내 피부를 이해하고,|Conoce un poco más.
A brighter ritual.|더 빛나는 루틴을 만나세요.|Una rutina más luminosa.
Skin is personal. Let’s start with what it needs.|피부는 저마다 달라요. 필요한 것부터 알아볼까요?|Cada piel es única. Empecemos por lo que necesita.
Analyzed by YouCam Skin AI.|YouCam Skin AI로 분석했습니다.|Analizado por YouCam Skin AI.
Illustrative sample report, not a real analysis.|실제 분석이 아닌 예시용 샘플 리포트입니다.|Informe de muestra ilustrativo, no un análisis real.
Average of available scores|평균 점수|Puntuación media
Average score|평균 점수|Puntuación media
Sample skin balance|샘플 평균 점수|Puntuación media de muestra
Skin age|피부 나이|Edad de la piel
Not returned by YouCam|YouCam에서 제공하지 않았습니다|YouCam no proporcionó este dato
Not available in demo|데모에서는 제공되지 않습니다|No disponible en la demo
Your skin, at a glance|한눈에 보는 내 피부|Tu piel de un vistazo
SAMPLE REPORT|샘플 리포트|INFORME DE MUESTRA
Higher score = more balanced. Missing results are marked unavailable.|점수가 높을수록 균형 잡힌 상태입니다. 없는 결과는 제공되지 않음으로 표시됩니다.|Una puntuación mayor indica más equilibrio. Los resultados ausentes se indican como no disponibles.
Unavailable|제공되지 않음|No disponible
Moisture|수분|Hidratación
Dark spots|색소 반점|Manchas oscuras
Dark circles|다크서클|Ojeras
Wrinkles|주름|Arrugas
Texture|피부결|Textura
A little extra hydration goes a long way.|수분을 조금 더 채워주세요.|Un poco más de hidratación puede ayudar mucho.
Build a gentle, consistent glow routine.|순하고 꾸준한 브라이트닝 루틴을 만들어 보세요.|Crea una rutina suave y constante para dar luminosidad.
Give your eye area a little attention.|눈가에 조금 더 신경 써주세요.|Dale un poco de atención al contorno de ojos.
Keep up your nourishing daily ritual.|영양을 채우는 매일의 루틴을 이어가세요.|Mantén tu rutina nutritiva diaria.
Your skin looks beautifully balanced.|피부가 고르게 균형 잡혀 있어요.|Tu piel muestra un buen equilibrio.
YouCam skin analysis score.|YouCam 피부 분석 점수입니다.|Puntuación del análisis de piel de YouCam.
Find my K-beauty matches|맞춤 K-뷰티 제품 보기|Ver mis recomendaciones de K-beauty
YouCam cosmetic analysis. Scores are not a medical diagnosis.|YouCam의 미용 목적 분석입니다. 점수는 의학적 진단이 아닙니다.|Análisis cosmético de YouCam. Las puntuaciones no son un diagnóstico médico.
Demo scores are fixed and do not assess your photo. Cosmetic inspiration only; not a diagnosis.|데모 점수는 고정된 예시이며 사진을 분석하지 않습니다. 미용 참고용으로, 진단이 아닙니다.|Las puntuaciones de la demo son fijas y no evalúan tu foto. Solo inspiración cosmética; no es un diagnóstico.
02 / YOUR CURATED SHELF|02 / 나만의 맞춤 제품|02 / TU SELECCIÓN PERSONALIZADA
Good skin days|기분 좋은 피부의 시작,|Los días de buena piel
start here.|여기에서 만나세요.|empiezan aquí.
A little hydration. A little radiance.|수분을 더하고, 생기를 채워요.|Un poco de hidratación. Un poco de luminosidad.
K-beauty favorites for your sample skin story.|샘플 피부 리포트에 맞춘 K-뷰티 추천입니다.|Favoritos de K-beauty para tu informe de muestra.
K-beauty favorites for your YouCam skin story.|YouCam 피부 리포트에 맞춘 K-뷰티 추천입니다.|Favoritos de K-beauty para tu informe de YouCam.
Next: find your color →|다음: 나만의 컬러 찾기 →|Siguiente: encuentra tu color →
Your age range|연령대|Tu rango de edad
Optional|선택 사항|Opcional
Skip this if you prefer. Choosing a range adjusts the order of your matches; your skin report still guides product selection.|선택하지 않아도 됩니다. 연령대를 고르면 추천 순서가 조정되며, 제품은 피부 리포트를 바탕으로 선정됩니다.|Puedes omitirlo. Elegir un rango ajusta el orden de las recomendaciones; tu informe de piel sigue guiando la selección.
Prefer not to say|선택하지 않음|Prefiero no indicarlo
20s|20대|20–29
30s|30대|30–39
40s|40대|40–49
50s+|50대 이상|50 o más
Editorial demo preferences, not an assessment of your skin.|데모용 추천 기준이며, 피부 상태에 대한 평가가 아닙니다.|Preferencias editoriales de demostración, no una evaluación de tu piel.
Glow serum and lightweight hydration first.|글로우 세럼과 가벼운 보습을 우선합니다.|Primero, sérum luminoso e hidratación ligera.
Eye care and hydration first.|눈가 관리와 보습을 우선합니다.|Primero, cuidado de ojos e hidratación.
Moisture cream and eye care first.|보습 크림과 눈가 관리를 우선합니다.|Primero, crema hidratante y cuidado de ojos.
A moisture-focused ritual first.|보습 중심의 루틴을 우선합니다.|Primero, una rutina centrada en la hidratación.
All essentials|전체 제품|Todos los esenciales
Hydration|보습|Hidratación
Radiance|생기|Luminosidad
Makeup|메이크업|Maquillaje
YOUR CURATED RITUAL|나만의 맞춤 루틴|TU RUTINA PERSONALIZADA
A small ritual, picked for you.|나를 위해 고른 간단한 루틴.|Una pequeña rutina elegida para ti.
Based on your sample skin concerns|샘플 피부 고민에 맞춘 추천|Según las necesidades de piel de muestra
Based on your YouCam skin concerns|YouCam 피부 분석에 맞춘 추천|Según las necesidades de tu piel analizadas por YouCam
Add ritual ·|루틴 담기 ·|Añadir rutina ·
Your curated ritual was added to your bag|맞춤 루틴을 장바구니에 담았습니다|Tu rutina personalizada se añadió a la bolsa
Hydrating essence|보습 에센스|Esencia hidratante
Glow serum|글로우 세럼|Sérum luminoso
Eye serum|아이 세럼|Sérum de ojos
Moisture cream|보습 크림|Crema hidratante
Radiance serum|브라이트닝 세럼|Sérum iluminador
Nourishing serum|영양 세럼|Sérum nutritivo
Lip tint|립 틴트|Tinte labial
Powder blush|파우더 블러셔|Colorete en polvo
FOR MOISTURE|수분 케어|PARA LA HIDRATACIÓN
FOR SPOTS|색소 반점 케어|PARA LAS MANCHAS
FOR DARK CIRCLES|다크서클 케어|PARA LAS OJERAS
FOR WRINKLES|주름 케어|PARA LAS ARRUGAS
COLOR PLAY|컬러 체험|PRUEBA DE COLOR
Selected for moisture|수분 케어를 위한 추천|Elegido para la hidratación
Selected for spots|색소 반점 케어를 위한 추천|Elegido para las manchas
Selected for dark circles|다크서클 케어를 위한 추천|Elegido para las ojeras
Selected for wrinkles|주름 케어를 위한 추천|Elegido para las arrugas
Try a fresh look|새로운 룩을 체험하세요|Prueba un look nuevo
View product details ↗|제품 상세 보기 ↗|Ver detalles del producto ↗
Add to bag +|장바구니 담기 +|Añadir a la bolsa +
Product photos belong to their brands. USD reference prices checked Oct 22, 2026; prices and availability may change. Demo bag only.|제품 사진은 각 브랜드의 소유입니다. 미국 달러 기준 참고 가격은 2026년 10월 22일 확인했으며, 가격과 재고는 변동될 수 있습니다. 데모 장바구니입니다.|Las fotos pertenecen a sus marcas. Precios de referencia en USD consultados el 22 de octubre de 2026; los precios y la disponibilidad pueden cambiar. Bolsa de demostración.
03 / A LITTLE COLOR THERAPY|03 / 컬러로 전하는 기분 전환|03 / UN POCO DE TERAPIA DE COLOR
Same you.|나답게,|La misma esencia.
New mood.|새로운 분위기로.|Un nuevo aire.
Find a shade that feels like you.|나에게 어울리는 컬러를 찾아보세요.|Encuentra un tono que vaya contigo.
YouCam Makeup VTO · Render your chosen shades.|YouCam Makeup VTO · 선택한 컬러로 가상 메이크업을 생성하세요.|YouCam Makeup VTO · Genera una vista con tus tonos elegidos.
Mock overlay preview · Analyze a selfie with YouCam for live try-on.|데모 오버레이 미리보기 · 실제 가상 체험은 YouCam으로 셀카를 분석한 뒤 이용하세요.|Vista de superposición de muestra · Analiza una selfie con YouCam para una prueba real.
ORIGINAL|원본|ORIGINAL
YOUCAM MAKEUP RESULT|YOUCAM 메이크업 결과|RESULTADO DE MAQUILLAJE YOUCAM
ORIGINAL · RENDER TO TRY ON|원본 · 생성하여 체험하기|ORIGINAL · GENERA PARA PROBAR
MOCK COLOR PREVIEW|데모 컬러 미리보기|VISTA PREVIA DE COLOR DE MUESTRA
Show makeup preview|메이크업 미리보기|Ver maquillaje
Compare with original|원본과 비교|Comparar con el original
YOUR COLOR STUDIO|나만의 컬러 스튜디오|TU ESTUDIO DE COLOR
A soft touch of Seoul.|서울의 감성을 은은하게.|Un toque suave de Seúl.
Choose colors, then render with YouCam. Each render uses API credits. Colors are approximate mood shades.|컬러를 고른 뒤 YouCam으로 생성하세요. 생성할 때마다 API 크레딧이 사용됩니다. 컬러는 분위기를 표현하는 근사 색상입니다.|Elige colores y genera la imagen con YouCam. Cada generación usa créditos de API. Los tonos son aproximados.
Choose a lip and cheek mood. Fixed overlays are illustrative and may not align with uploaded faces.|립과 치크 컬러를 골라보세요. 고정된 데모 오버레이는 예시이며, 업로드한 얼굴과 위치가 맞지 않을 수 있습니다.|Elige tonos para labios y mejillas. Las superposiciones fijas son ilustrativas y pueden no alinearse con los rostros subidos.
Lip mood|립 컬러|Tono de labios
Cheek mood|치크 컬러|Tono de mejillas
Cherry|체리|Cereza
Peach|피치|Melocotón
Bare|누드|Natural
Rose|로즈|Rosa
Berry|베리|Frutos rojos
Apricot|애프리콧|Albaricoque
Intensity|강도|Intensidad
YouCam is rendering…|YouCam이 메이크업을 생성하고 있어요…|YouCam está generando la imagen…
Render with YouCam →|YouCam으로 생성하기 →|Generar con YouCam →
Colors changed. Render again to preview this look.|컬러가 바뀌었습니다. 새 룩을 보려면 다시 생성하세요.|Los colores cambiaron. Genera otra imagen para ver este look.
Shade names describe demo colors; product cart variants remain Mulled Peach and Blueberry Chip.|색상 이름은 데모 컬러를 뜻합니다. 장바구니 제품 옵션은 Mulled Peach와 Blueberry Chip으로 유지됩니다.|Los nombres describen colores de muestra; las variantes de la bolsa siguen siendo Mulled Peach y Blueberry Chip.
Add lip + cheek duo ·|립 + 치크 듀오 담기 ·|Añadir dúo de labios y mejillas ·
Review my glow bag →|장바구니 확인하기 →|Revisar mi bolsa →
Your skin. Your shades. Your kind of glow.|내 피부, 내 컬러, 나만의 빛.|Tu piel. Tus tonos. Tu propia luminosidad.
MADE FOR THE YOUCAM API HACKATHON · PROTOTYPE|YOUCAM API 해커톤을 위한 프로토타입|PROTOTIPO PARA EL HACKATHON DE YOUCAM API
Your glow bag|내 장바구니|Tu bolsa de belleza
Close bag|장바구니 닫기|Cerrar bolsa
Your demo ritual is complete.|데모 루틴 체험을 완료했어요.|Tu rutina de demostración está completa.
No payment was taken and no order was placed.|결제되거나 주문된 내역이 없습니다.|No se realizó ningún pago ni pedido.
Keep exploring|계속 둘러보기|Seguir explorando
A little room for glow.|빛나는 피부를 위한 빈자리.|Un espacio para tu luminosidad.
Your bag is waiting for its first favorite.|마음에 드는 첫 제품을 담아보세요.|Tu bolsa espera tu primer favorito.
Explore your ritual|나만의 루틴 둘러보기|Explorar tu rutina
Remove|삭제|Quitar
Total (USD)|합계 (USD)|Total (USD)
Demo bag. No shipping, tax, payment, or order fulfillment.|데모 장바구니입니다. 배송, 세금, 결제 및 실제 주문 처리는 없습니다.|Bolsa de demostración. Sin envío, impuestos, pagos ni pedidos reales.
Finish demo|데모 완료|Finalizar demo
Please choose a JPG, PNG, or WebP photo.|JPG, PNG 또는 WebP 사진을 선택하세요.|Elige una foto JPG, PNG o WebP.
Please choose a photo smaller than 10 MB.|10MB보다 작은 사진을 선택하세요.|Elige una foto de menos de 10 MB.
Choose a selfie and allow YouCam processing first.|먼저 셀카를 선택하고 YouCam 분석에 동의해주세요.|Primero elige una selfie y permite el procesamiento con YouCam.
The API server is unavailable. Please try again.|API 서버에 연결할 수 없습니다. 다시 시도해주세요.|El servidor de API no está disponible. Inténtalo de nuevo.
The API server is unavailable. Run the app with its API server.|API 서버에 연결할 수 없습니다. API 서버와 함께 앱을 실행하세요.|El servidor de API no está disponible. Ejecuta la app con su servidor de API.
YouCam request failed.|YouCam 요청에 실패했습니다.|La solicitud a YouCam falló.
Choose a larger photo: at least 480 pixels on each side.|가로와 세로가 각각 480픽셀 이상인 사진을 선택하세요.|Elige una foto de al menos 480 píxeles por lado.
Choose a less narrow photo with your full face visible.|얼굴 전체가 보이는, 덜 길쭉한 사진을 선택하세요.|Elige una foto menos estrecha donde se vea todo tu rostro.
YouCam is taking longer than expected. Please try again later.|YouCam 분석이 예상보다 오래 걸립니다. 잠시 후 다시 시도해주세요.|YouCam está tardando más de lo esperado. Inténtalo más tarde.
Live API is not configured. You can still explore the demo.|실제 분석 API가 설정되지 않았습니다. 데모는 이용할 수 있습니다.|La API no está configurada. Puedes explorar la demo.
This photo session expired. Upload your selfie again.|사진 세션이 만료됐습니다. 셀카를 다시 업로드하세요.|La sesión de la foto caducó. Vuelve a subir tu selfie.
YouCam could not be reached. Please try again.|YouCam에 연결할 수 없습니다. 다시 시도해주세요.|No se pudo conectar con YouCam. Inténtalo de nuevo.
YouCam could not authenticate. Check the server API key.|YouCam 인증에 실패했습니다. 서버 API 키를 확인하세요.|YouCam no pudo autenticar la solicitud. Revisa la clave de API del servidor.
YouCam credits are insufficient. Please check your API account.|YouCam 크레딧이 부족합니다. API 계정을 확인하세요.|No hay suficientes créditos de YouCam. Revisa tu cuenta de API.
YouCam is busy. Please wait a moment before trying again.|YouCam 요청이 많습니다. 잠시 후 다시 시도해주세요.|YouCam está ocupado. Espera un momento e inténtalo de nuevo.
YouCam returned an unsupported result URL.|YouCam이 지원하지 않는 결과 주소를 반환했습니다.|YouCam devolvió una URL de resultado no compatible.
YouCam returned no readable skin scores. Try another photo.|YouCam에서 읽을 수 있는 피부 점수를 받지 못했습니다. 다른 사진을 사용하세요.|YouCam no devolvió puntuaciones legibles. Prueba con otra foto.
Please upload a valid JPEG photo.|올바른 JPEG 사진을 업로드하세요.|Sube una foto JPEG válida.
The prepared image is invalid or too large.|준비한 이미지가 올바르지 않거나 너무 큽니다.|La imagen preparada no es válida o es demasiado grande.
Could not initialize the photo upload.|사진 업로드를 시작하지 못했습니다.|No se pudo iniciar la subida de la foto.
Unsupported upload method.|지원하지 않는 업로드 방식입니다.|Método de subida no compatible.
Photo upload failed. Please try again.|사진 업로드에 실패했습니다. 다시 시도해주세요.|La subida de la foto falló. Inténtalo de nuevo.
Unknown analysis type.|알 수 없는 분석 유형입니다.|Tipo de análisis desconocido.
Choose valid makeup colors and intensity.|올바른 메이크업 컬러와 강도를 선택하세요.|Elige colores e intensidad de maquillaje válidos.
YouCam did not return a task identifier.|YouCam에서 작업 식별자를 받지 못했습니다.|YouCam no devolvió un identificador de tarea.
This photo could not be processed. Use a clear, front-facing selfie in even light.|사진을 분석할 수 없습니다. 균일한 조명에서 선명한 정면 셀카를 촬영하세요.|No se pudo procesar esta foto. Usa una selfie frontal nítida con luz uniforme.
YouCam could not complete this task. Try again or choose another photo.|YouCam이 작업을 완료하지 못했습니다. 다시 시도하거나 다른 사진을 선택하세요.|YouCam no pudo completar la tarea. Inténtalo de nuevo o elige otra foto.
YouCam returned no makeup image.|YouCam에서 메이크업 결과 이미지를 받지 못했습니다.|YouCam no devolvió una imagen de maquillaje.
Unknown operation.|알 수 없는 작업입니다.|Operación desconocida.
Cross-site requests are not allowed.|다른 사이트에서의 요청은 허용되지 않습니다.|No se permiten solicitudes de otros sitios.
Method not allowed.|허용되지 않는 요청 방식입니다.|Método no permitido.
JSON required.|JSON 형식이 필요합니다.|Se requiere formato JSON.
Photo is too large.|사진이 너무 큽니다.|La foto es demasiado grande.
Invalid request.|올바르지 않은 요청입니다.|Solicitud no válida.
Unable to complete the request. Please try again.|요청을 완료하지 못했습니다. 다시 시도해주세요.|No se pudo completar la solicitud. Inténtalo de nuevo.
`;
export const messages = Object.fromEntries(rows.trim().split('\n').filter(row => row.trim()).map(row => {
  const [en, ko, es] = row.split('|');
  return [en, {ko, es}];
}));
export const LanguageContext = React.createContext('en');
export const languages = ['en', 'ko', 'es'];
export function initialLanguage() {
  try { const value = localStorage.getItem('k-glow-language'); return languages.includes(value) ? value : 'en'; }
  catch { return 'en'; }
}
export function translate(source, language = 'en') {
  if (typeof source !== 'string' || language === 'en') return source;
  const normalized = source.replace(/\s+/g, ' ').trim();
  const entry = messages[normalized]?.[language];
  if (entry) return source.match(/^\s*/)[0] + entry + source.match(/\s*$/)[0];
  if (source.includes(' → ')) return source.split(' → ').map(s => translate(s,language)).join(' → ');
  const age = normalized.match(/^( · )?Refined for (20s|30s|40s|50s\+)(:)?$/) || normalized.match(/^· Refined for (20s|30s|40s|50s\+)$/);
  if (age) {
    const range = normalized.match(/20s|30s|40s|50s\+/)[0];
    return `${normalized.startsWith('·') ? ' · ' : ''}${language === 'ko' ? translate(range,language)+' 맞춤 추천' : 'Adaptado a '+translate(range,language)}${normalized.endsWith(':') ? ': ' : ''}`;
  }
  let match = normalized.match(/^(.+) added to your bag$/);
  if (match) return language === 'ko' ? `${match[1]} 제품을 장바구니에 담았습니다` : `${match[1]} se añadió a tu bolsa`;
  match = normalized.match(/^Add (.+) to bag$/);
  if (match) return language === 'ko' ? `${match[1]} 장바구니 담기` : `Añadir ${match[1]} a la bolsa`;
  match = normalized.match(/^(Decrease|Increase) (.+)$/);
  if (match) return language === 'ko' ? `${match[2]} 수량 ${match[1] === 'Decrease' ? '줄이기' : '늘리기'}` : `${match[1] === 'Decrease' ? 'Reducir' : 'Aumentar'} cantidad de ${match[2]}`;
  match = normalized.match(/^YouCam rejected the request( \([\w-]+\))?\. Check photo quality and API access\.$/);
  if (match) return language === 'ko' ? `YouCam이 요청을 거부했습니다${match[1] || ''}. 사진 품질과 API 권한을 확인하세요.` : `YouCam rechazó la solicitud${match[1] || ''}. Revisa la calidad de la foto y el acceso a la API.`;
  return source;
}
export function translateError(source,language) {
  const vendor = source.match(/^(.*) (\(YouCam: error_[a-z0-9_]+\))$/);
  if (vendor) return translateError(vendor[1],language) + ' ' + vendor[2];
  const result = translate(source,language);
  return language === 'en' || result !== source ? result : translate('Unable to complete the request. Please try again.',language);
}
// Translate only rendered copy and accessible labels, never values, URLs, keys,
// event handlers, catalog data or API parameters. React retains element identity.
export function translateTree(node, language) {
  if (typeof node === 'string') return translate(node,language);
  if (Array.isArray(node)) return node.map(child => translateTree(child,language));
  if (!React.isValidElement(node)) return node;
  const props = {};
  for (const key of ['aria-label','alt','title','placeholder']) {
    if (typeof node.props[key] === 'string') props[key] = translate(node.props[key],language);
  }
  if ('children' in node.props) props.children = translateTree(node.props.children,language);
  return React.cloneElement(node, props);
}

