gsap.registerPlugin(ScrollTrigger)

const interactiveJS = () => {
    // Clear Scroll Memory
    window.history.scrollRestoration = 'manual'

    // Canvas
        // Change '.webgl' with a canvas querySelector
    const canvas = document.querySelector('.webgl')

    // Scene
    const scene = new THREE.Scene()

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xf3f3f3, 1)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xf3f3f3, 0.5)
    directionalLight.position.set(0, 10, 10)

    scene.add(directionalLight)
    // Sizes
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    let isPortrait = false

    if (window.innerWidth < window.innerHeight) {
        isPortrait = true
    }

    window.addEventListener('resize', () => {    
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight

        // Update camera
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()

        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        let prevIsPortrait = isPortrait
        if (window.innerWidth < window.innerHeight) {
            isPortrait = true
        }
        else {
            isPortrait = false
        }

        if (prevIsPortrait != isPortrait) {
            location.reload()
        }
    })

    // Loaders
    const textureLoader = new THREE.TextureLoader()
    const mainPhotoTexture = textureLoader.load('./images/MainPhoto.png')

    // GLTF Loader
    const gltfLoader = new THREE.GLTFLoader()

    // 3D Objects
    // ----------------------------------------------------------------

    // ----------------------------------------------------------------

    // Base camera
    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
    camera.position.set(0,0,10)
    scene.add(camera)

    // Controls
    // const controls = new THREE.OrbitControls(camera, canvas)
    // controls.enabled = true

    // Renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = false

    // Animations

    // Events
    // --------------------------------------

    // Raycast
    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector3()
    const point = new THREE.Vector3()

    // Mouse
    const mouse = {
        x: 0,
        y: 0
    }

    const mouseFlip = {
        x: 0,
        y: 0
    }

    let sliderWidth = 4296

    // Scroll Events
    let lastScrollTop = 0
    window.addEventListener('scroll', () => {
        let st = window.pageYOffset || document.documentElement.scrollTop
        if (st > lastScrollTop){
            // Down

        } else {
            // Up

        }
        lastScrollTop = st <= 0 ? 0 : st;
    }, false)

    // Pointer Events
    document.addEventListener('pointermove', (e) => {
        mouse.x = e.clientX/window.innerWidth - 0.5
        mouse.y = -(e.clientY/window.innerHeight - 0.5)

        mouseFlip.x = mouse.x + 0.5

        // Perspective
        // gsap.to('.perspectiveChangeDiv', {duration: 1, rotateY: mouse.x * 10 + 'deg', rotateX: -mouse.y * 10 + 'deg', x: mouse.x * 20, y: -mouse.y * 20})

        // 3D --------------

        // Update Pointer Coordinates
        pointer.set(
            ( e.clientX / window.innerWidth ) * 2 - 1,
            - ( e.clientY / window.innerHeight ) * 2 + 1,
            0.575
        )

        // Match Mouse and 3D Pointer Coordinates
        pointer.unproject(camera)
        pointer.sub(camera.position).normalize()
        let distance = -(camera.position.z) / pointer.z
        point.copy(camera.position).add((pointer.multiplyScalar(distance)))

    })

    // --------------------------------------

    // Animate
    // --------------------------------------
    const clock = new THREE.Clock()

    const tick = () =>
    {
        const elapsedTime = clock.getElapsedTime()
        
        // Camera Movement
        // gsap.to(camera.rotation, {duration: 1, x: mouse.y * 0.01, y: - mouse.x * 0.01})

        // Render
        renderer.render(scene, camera)

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }

    // ScrollTriggers
    // -------------------------------------------------
    // gsap.fromTo(businessCardGroup.rotation, {y: 0}, {
    //     scrollTrigger: {
    //         trigger: '.mainBody',
    //         start: () =>  document.querySelector('.mainBody').clientHeight*0  + ' top',
    //         end: () =>  document.querySelector('.mainBody').clientHeight*1  + ' top',
    //         // toggleActions: "play none none reverse",
    //         // snap: true,
    //         scrub: true,
    //         // pin: false,
    //         // markers: true,
    //     },
    //     y: Math.PI,
    //     ease: 'none'
    // })

    gsap.fromTo('.businessCardFront', {rotateY: '0deg'}, {
        scrollTrigger: {
            trigger: '.mainBody',
            start: () =>  document.querySelector('.mainBody').clientHeight*0  + ' top',
            end: () =>  document.querySelector('.mainBody').clientHeight*1  + ' top',
            // toggleActions: "play none none reverse",
            // snap: true,
            scrub: true,
            // pin: false,
            // markers: true,
        },
        rotateY: '180deg',
        ease: 'none'
    })

    gsap.fromTo('.businessCardBack', {rotateY: '-180deg'}, {
        scrollTrigger: {
            trigger: '.mainBody',
            start: () =>  document.querySelector('.mainBody').clientHeight*0  + ' top',
            end: () =>  document.querySelector('.mainBody').clientHeight*1  + ' top',
            // toggleActions: "play none none reverse",
            // snap: true,
            scrub: true,
            // pin: false,
            // markers: true
        },
        rotateY: '0deg',
        ease: 'none'
    })

    gsap.fromTo('.businessCardBack', {opacity: 0}, {
        scrollTrigger: {
            trigger: '.mainBody',
            start: () =>  document.querySelector('.mainBody').clientHeight*0.5  + ' top',
            toggleActions: "restart none none reverse",
            // snap: true,
            // scrub: true,
            // pin: false,
            // markers: true
        },
        duration: 0.01,
        opacity: 1,
        ease: 'none'
    })

    gsap.fromTo('.businessCardFront', {opacity: 1}, {
        scrollTrigger: {
            trigger: '.mainBody',
            start: () =>  document.querySelector('.mainBody').clientHeight*0.5  + ' top',
            toggleActions: "restart none none reverse",
            // snap: true,
            // scrub: true,
            // pin: false,
            // markers: true
        },
        duration: 0.01,
        opacity: 0,
        ease: 'none'
    })

    gsap.to('.businessCardBack', {duration: 0, opacity: 0})
    
    // Image Loader

    let images = document.images
    let len = images.length
    let counter = 0

    const incrementCounter = () => {
        counter++
        if ( counter >= (len - 1) ) {
            gsap.to('.loadingPage', {duration: 1, delay: 1, opacity: 0})
            setTimeout(() => {

            }, 1000)
        }
    }

    for (let i = 0; i < images.length; i++) {
        if(images[i].complete) {
            incrementCounter()
        }
        else {
            images[i].addEventListener( 'load', () => {
                incrementCounter()
            }, false )
        }
    }

    tick()
}

interactiveJS()

const frontCanvas = () => {

    const mainColors = [
        [new THREE.Color(0x7676e4), new THREE.Color(0x45e2b6), '#7676e4', '#45e2b6', '#7676e410', '#7676e440'],
        [new THREE.Color(0x101820), new THREE.Color(0xffffff), '#101820', '#ffffff', '#10182010', '#10182040'],
        [new THREE.Color(0x00539C), new THREE.Color(0xFC766A), '#00539C', '#FC766A', '#00539C10', '#00539C40'], 
        [new THREE.Color(0xF93822), new THREE.Color(0xFDD20E), '#F93822', '#FDD20E', '#F9382210', '#F9382240'], 
        [new THREE.Color(0x6E6E6D), new THREE.Color(0xFAD0C9), '#6E6E6D', '#FAD0C9', '#6E6E6D10', '#6E6E6D40'], 
    ]

    // Canvas
        // Change '.webgl' with a canvas querySelector
    const canvas = document.querySelector('.frontCanvas')

    // Scene
    const scene = new THREE.Scene()

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xf3f3f3, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.PointLight(0xf3f3f3, 1)
    directionalLight.position.set(0, 10, 10)
    scene.add(directionalLight)

    // Sizes
    const sizes = {
        width: 1100,
        height: 1100*2/3.5
    }

    let isPortrait = false

    if (window.innerWidth < window.innerHeight) {
        isPortrait = true
    }

    window.addEventListener('resize', () => {    
        // Update sizes
        sizes.width = 1100
        sizes.height = 1100*2/3.5

        // Update camera
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()

        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        let prevIsPortrait = isPortrait
        if (window.innerWidth < window.innerHeight) {
            isPortrait = true
        }
        else {
            isPortrait = false
        }

        if (prevIsPortrait != isPortrait) {
            location.reload()
        }
    })

    // Loaders
    const textureLoader = new THREE.TextureLoader()
    const mainPhotoTexture = textureLoader.load('./images/MainPhoto.png')

    // GLTF Loader
    const gltfLoader = new THREE.GLTFLoader()

    // 3D Objects
    // ----------------------------------------------------------------

    const boxGeometry = new THREE.BoxGeometry(0.75,0.75,0.75)
    const boxMaterial = new THREE.MeshStandardMaterial({
        color: mainColors[0][0],
        roughness: 1
    })
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)
    scene.add(boxMesh)

    const boxBobbleGroup = new THREE.Group
    boxBobbleGroup.add(boxMesh)
    scene.add(boxBobbleGroup)

    const boxGroup = new THREE.Group
    boxGroup.add(boxBobbleGroup)
    boxGroup.position.set(4.7, 0 + 2, 0)
    scene.add(boxGroup)

    const tetraGeometry = new THREE.TetrahedronGeometry(0.7, 0)
    const tetraMaterial = new THREE.MeshStandardMaterial({
        color: mainColors[0][0],
        roughness: 1
    })
    const tetraMesh = new THREE.Mesh(tetraGeometry, tetraMaterial)
    scene.add(tetraMesh)

    const tetraBobbleGroup = new THREE.Group
    tetraBobbleGroup.add(tetraMesh)
    scene.add(tetraBobbleGroup)

    const tetraGroup = new THREE.Group
    tetraGroup.add(tetraBobbleGroup)
    tetraGroup.position.set(9.35, 2 + 2, -5)
    scene.add(tetraGroup)

    const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 16)
    const sphereMaterial = new THREE.MeshStandardMaterial({
        color: mainColors[0][1],
        roughness: 1
    })
    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
    scene.add(sphereMesh)

    const sphereBobbleGroup = new THREE.Group
    sphereBobbleGroup.add(sphereMesh)
    scene.add(sphereBobbleGroup)

    const sphereGroup = new THREE.Group
    sphereGroup.add(sphereBobbleGroup)
    sphereGroup.position.set(10.75, 0.5 + 2, -8)
    scene.add(sphereGroup)

    const boxRotations = {
        x: (Math.random() * 1.9 + 0.1) - 1,
        y: (Math.random() * 1.9 + 0.1) - 1,
        z: (Math.random() * 1.9 + 0.1) - 1,
    } 

    const tetraRotations = {
        x: (Math.random() * 1.9 + 0.1) - 1,
        y: (Math.random() * 1.9 + 0.1) - 1,
        z: (Math.random() * 1.9 + 0.1) - 1,
    } 

    const sphereRotations = {
        x: (Math.random() * 1.9 + 0.1) - 1,
        y: (Math.random() * 1.9 + 0.1) - 1,
        z: (Math.random() * 1.9 + 0.1) - 1,
    } 

    // Particles    
    // Parameters
    const parameters = {
        count: 2000,
        size: 0.1,
        aspect: window.innerWidth/window.innerHeight,
        radius: 0.5,
        groupDiameter: 3
    }

    // Initializations
    const particleGroup = []
    const originalPositions = []
    const allParticles = new THREE.Group

    let rowCounter = 0
    let colCounter = 0

    // Make Particles
    for (let i = 0; i < parameters.count; i++) {
        // Center Particles
        const vertices = []
        vertices.push(0,0,0)

        const particleG = new THREE.BufferGeometry()
        particleG.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))

        const particleM = new THREE.PointsMaterial({
            color: mainColors[0][i%mainColors[0].length],
            size: parameters.size,
            depthWrite: true,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending,
            transparent: true
        })
        
        const particles = new THREE.Points(particleG, particleM)

        // Randomize Particle Position in a Circle
        const x = (Math.random() - 0.5) * 2 - 5.5
        const y = (Math.random() - 0.5) * 9
        const z = 0

        // Pattern Position
        // const x = -7 + rowCounter * (0.1 + rowCounter**1.5 * 0.01)
        // const y = -4 + colCounter * 0.5
        // const z = 0

        // if (rowCounter < 33) {
        //     rowCounter++
        // }
        // else {
        //     rowCounter = 0
        //     colCounter++
        // }
        

        // Save Original Positions
        originalPositions[i] = [x,y]

        particleGroup.push(particles)
        particleGroup[i].position.set(x,y,z)
        scene.add(particles)
        allParticles.add(particles)
    }

    scene.add(allParticles)

    // ----------------------------------------------------------------

    // Base camera
    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
    camera.position.set(0,0,10)
    scene.add(camera)

    // Controls
    // const controls = new THREE.OrbitControls(camera, canvas)
    // controls.enabled = true

    // Renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = false

    // Animations

    const startupAnimations = () => {
        headerAnimations()
        // testAnimations()
    }

    // Header Animations
    let isStartupDone = false

    const headerAnimations = () => {
        gsap.to('.headerDiv', {duration: 0.75, delay: 3, width: 600, ease: 'Power1.easeOut'})

        gsap.to('.titleTopRightContainer', {duration: 0.75, delay: 3.2, x: 40, ease: 'Power1.easeOut'})
        gsap.to('.titleBotRightContainer', {duration: 0.75, delay: 3.2, x: -40, ease: 'Power1.easeOut'})

        gsap.to('.quotationDiv', {duration: 2.6, rotateZ: 360, ease: 'Power1.easeOut'})
        gsap.to('.quotationDiv', {duration: 0.75, delay: 2.6, y: -235, ease: 'Power1.easeOut'})

        gsap.to('.quotationGap', {duration: 0.75, delay: 3.75, width: 400, ease: 'Power1.easeOut'})

        gsap.to('.topSummaryTextDiv', {duration: 1.25, delay: 3.75, opacity: 1, ease: 'Power1.easeOut'})
        gsap.to('.bottomSummaryTextDiv', {duration: 1.25, delay: 4.25, opacity: 1, ease: 'Power1.easeOut'})

        gsap.to('.bracketDiv', {duration: 2.6, rotateZ: -360, ease: 'Power1.easeOut'})
        gsap.to('.bracketDiv', {duration: 0.75, delay: 2.6, y: 145, ease: 'Power1.easeOut'})
        gsap.to(skillUnderlines[0], {duration: 0.35, delay: 3, width: 338, ease: 'Power1.easeOut'})

        gsap.to(bracketSkillsContainers[0], {duration: 0.2, delay: 5, x: 0, opacity: 1})
        
        for (let i = 0; i < skillTexts.length; i++) {
            gsap.to(skillTexts[i], {duration: 0.6, delay: 5 + i * 0.5, x: 0, ease: 'Power1.easeOut'})
        }

        setTimeout(() => {
            isStartupDone = true
            adjectiveChange(adjectiveIndex)
        }, 8000)
    }

    const testAnimations = () => {
        gsap.to('.headerDiv', {duration: 0, delay: 0, width: 600, ease: 'Power1.easeOut'})

        gsap.to('.titleTopRightContainer', {duration: 0, delay: 0, x: 40, ease: 'Power1.easeOut'})
        gsap.to('.titleBotRightContainer', {duration: 0, delay: 0, x: -40, ease: 'Power1.easeOut'})

        gsap.to('.quotationDiv', {duration: 0, rotateZ: 360, ease: 'Power1.easeOut'})
        gsap.to('.quotationDiv', {duration: 0, delay: 0, y: -235, ease: 'Power1.easeOut'})

        gsap.to('.quotationGap', {duration: 0, delay: 0, width: 400, ease: 'Power1.easeOut'})

        gsap.to('.topSummaryTextDiv', {duration: 0, delay: 0, opacity: 1, ease: 'Power1.easeOut'})
        gsap.to('.bottomSummaryTextDiv', {duration: 0, delay: 0, opacity: 1, ease: 'Power1.easeOut'})

        gsap.to('.bracketDiv', {duration: 0, rotateZ: -360, ease: 'Power1.easeOut'})
        gsap.to('.bracketDiv', {duration: 0, delay: 0, y: 145, ease: 'Power1.easeOut'})
        gsap.to(skillUnderlines[0], {duration: 0, delay: 0, width: 338, ease: 'Power1.easeOut'})
        
        for (let i = 0; i < skillTexts.length; i++) {
            gsap.to(skillTexts[i], {duration: 0, delay: 0 + i * 0, x: 0, ease: 'Power1.easeOut'})
        }

        setTimeout(() => {
            isStartupDone = true
            adjectiveChange(adjectiveIndex)
        }, 1000)
    }
    
    // Skills Events
    const skills = document.querySelectorAll('.skill')
    const skillUnderlines = document.querySelectorAll('.skillUnderline')
    const skillTexts = document.querySelectorAll('.skillText')
    let prevSkillIndex = 0
    
    const bracketSkillsContainers = document.querySelectorAll('.bracketSkillsContainer')

    for (let i = 0; i < bracketSkillsContainers.length; i++) {
        gsap.to(bracketSkillsContainers[i], {duration: 0, x: 50, opacity: 0})
    }

    for (let i = 0; i < skills.length; i++) {
        gsap.to(skillUnderlines[i], {duration: 0, width: 50})
        skills[i].addEventListener('mouseenter', () => {
            if (isStartupDone == true) {
                if (prevSkillIndex != i) {
                    gsap.to(bracketSkillsContainers[prevSkillIndex], {duration: 0.2, x: -50, opacity: 0})
                    gsap.to(bracketSkillsContainers[prevSkillIndex], {duration: 0, delay: 0.2, x: 50, opacity: 0})
                    gsap.to(bracketSkillsContainers[i], {duration: 0.2, x: 0, opacity: 1})

                    gsap.to(skillUnderlines[prevSkillIndex], {duration: 0.35, width: 50, ease: 'Power1.easeOut'})
                    gsap.to(skillUnderlines[i], {duration: 0.35, width: 338, ease: 'Power1.easeOut'})
                    gsap.to('.bracketDiv', {duration: 0.35, y: 145 + i * 43, ease: 'Power1.easeOut'})
                    prevSkillIndex = i
                }
            }
        })
    }

    // Adjective Events
    const adjectiveTexts = document.querySelectorAll('.adjectiveText')
    let adjectiveIndex = 0
    let adjectiveChangeDuration = 0.5
    let adjectiveStayDuration = 5
    let adjectiveChangeEase = 'back'

    for (let i = 1; i < adjectiveTexts.length; i++) {
        gsap.to(adjectiveTexts[i], {duration: 0, y: 40, x: -10, opacity: 0})
    }

    const adjectiveChange = (i) => {
        gsap.to(adjectiveTexts[i], {duration: adjectiveChangeDuration, y: -40, x: 10, opacity: 0, ease: adjectiveChangeEase})
        gsap.to(adjectiveTexts[i], {duration: 0, delay: adjectiveChangeDuration + 0.05, y: 40, x: -10, opacity: 0})

        if (adjectiveIndex < adjectiveTexts.length - 1) {
            gsap.to(adjectiveTexts[i + 1], {duration: adjectiveChangeDuration, y: 0, x: 0, opacity: 1, ease: adjectiveChangeEase})
            adjectiveIndex++
        }
        else {
            gsap.to(adjectiveTexts[0], {duration: adjectiveChangeDuration, y: 0, x: 0, opacity: 1, ease: adjectiveChangeEase})
            adjectiveIndex = 0
        }

        setTimeout(() => {
            adjectiveChange(adjectiveIndex)
        }, adjectiveChangeDuration * 1000 + adjectiveStayDuration * 1000)
    }

    // Events
    // --------------------------------------

    // Color Change
    let colorIndex = 1

    const colorChange = (x) => {
        gsap.to('.mainColor', {duration: 0, color: mainColors[x][2]})
        gsap.to('.mainBGColor', {duration: 0, backgroundColor: mainColors[x][2]})
        gsap.to('.subColor', {duration: 0, color: mainColors[x][3]})
        gsap.to('.cardBGColor', {duration: 0, backgroundColor: mainColors[x][4]})
        gsap.to('.sliderBGColor', {duration: 0, backgroundColor: mainColors[x][5]})

        for (let i = 0; i < particleGroup.length; i++) {
            gsap.to(particleGroup[i].material, {duration: 0, color: mainColors[x][i%2]})
        }

        boxMesh.material.color = mainColors[x][0]
        tetraMesh.material.color = mainColors[x][0]
        sphereMesh.material.color = mainColors[x][1]

        if (colorIndex < mainColors.length - 1) {
            colorIndex++
        }
        else {
            colorIndex = 0
        }
    }

    // Header Slider Events
    let isNightMode = false

    document.querySelector('.mainPhotoSlider').addEventListener('click', () => {
        if (flipValue.value < 0.5) {
            if (isNightMode == false) {
                isNightMode = true
                gsap.to('.headerSliderBody', {duration: 0.4, x: 400})
                // gsap.to('.headerTextDiv', {duration: 0, opacity: 0})
                // gsap.to('.headerTextReverseDiv', {duration: 0, opacity: 1})
    
                // Front
                // gsap.to('.businessCardFront', {duration: 0, backgroundColor: '#192734', color: '#ffffff'})
                // gsap.to('.headerDiv', {duration: 0, backgroundColor: '#22303c'})

                gsap.to('.titleTopLeftContainer', {duration: 0.75, delay: 0.1, x: -40, ease: 'Power1.easeOut'})
                gsap.to('.titleBotLeftContainer', {duration: 0.75, delay: 0.1, x: 40, ease: 'Power1.easeOut'})

                gsap.to('.titleTopRightContainer', {duration: 0.75, delay: 0.1, x: 0, ease: 'Power1.easeOut'})
                gsap.to('.titleBotRightContainer', {duration: 0.75, delay: 0.1, x: 0, ease: 'Power1.easeOut'})
    
                // Back
                // gsap.to('.businessCardBack', {duration: 0, backgroundColor: '#192734', color: '#ffffff'})
                colorChange(colorIndex)
            }
            else {
                isNightMode = false
                gsap.to('.headerSliderBody', {duration: 0.4, x: 0})
                // gsap.to('.headerTextDiv', {duration: 0, opacity: 1})
                // gsap.to('.headerTextReverseDiv', {duration: 0, opacity: 0})
    
                // Front
                // gsap.to('.businessCardFront', {duration: 0, backgroundColor: '#f5f5f5', color: '#000000'})
                // gsap.to('.headerDiv', {duration: 0, backgroundColor: '#E6E6FA'})

                gsap.to('.titleTopLeftContainer', {duration: 0.75, delay: 0.1, x: 0, ease: 'Power1.easeOut'})
                gsap.to('.titleBotLeftContainer', {duration: 0.75, delay: 0.1, x: 0, ease: 'Power1.easeOut'})

                gsap.to('.titleTopRightContainer', {duration: 0.75, delay: 0.1, x: 40, ease: 'Power1.easeOut'})
                gsap.to('.titleBotRightContainer', {duration: 0.75, delay: 0.1, x: -40, ease: 'Power1.easeOut'})
    
                // Back
                // gsap.to('.businessCardBack', {duration: 0, backgroundColor: '#f5f5f5', color: '#000000'})
                colorChange(colorIndex)
            }
        }
    })

    // Raycast
    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector3()
    const point = new THREE.Vector3()

    // Mouse
    const mouse = {
        x: 0,
        y: 0
    }

    const mouseFlip = {
        x: 0,
        y: 0
    }

    let sliderWidth = 4296

    // Scroll Events
    let lastScrollTop = 0
    window.addEventListener('scroll', () => {
        let st = window.pageYOffset || document.documentElement.scrollTop
        if (st > lastScrollTop){
            // Down

        } else {
            // Up

        }
        lastScrollTop = st <= 0 ? 0 : st;
    }, false)

    // Pointer Events
    document.addEventListener('pointermove', (e) => {
        mouse.x = e.clientX/window.innerWidth - 0.5
        mouse.y = -(e.clientY/window.innerHeight - 0.5)

        // Titel Parallax
        gsap.to('.titleTopRightParallax', {duration: 1, x: -mouse.x * 10})
        gsap.to('.titleBotRightParallax', {duration: 1, x: mouse.x * 10})

        gsap.to('.titleTopLeftParallax', {duration: 1, x: -mouse.x * 10})
        gsap.to('.titleBotLeftParallax', {duration: 1, x: mouse.x * 10})

        // 3D --------------

        // Update Pointer Coordinates
        pointer.set(
            (( e.clientX / window.innerWidth ) * 2 - 1) * (window.innerWidth/1100),
            (- ( e.clientY / window.innerHeight ) * 2 + 1) * (window.innerHeight/(1100 * 2/3.5)),
            0.575
        )

        // Match Mouse and 3D Pointer Coordinates
        pointer.unproject(camera)
        pointer.sub(camera.position).normalize()
        let distance = -(camera.position.z) / pointer.z
        point.copy(camera.position).add((pointer.multiplyScalar(distance)))

        // Check for Affected Particles
        for (let i = 0; i < particleGroup.length; i++) {
            const distanceFromPointerSquared = (particleGroup[i].position.x - pointer.x)**2 + (particleGroup[i].position.y - pointer.y)**2
            const directionVector = new THREE.Vector2(particleGroup[i].position.x - pointer.x, particleGroup[i].position.y - pointer.y)

            // Case: Affected
            if (distanceFromPointerSquared < parameters.radius && flipValue.value < 0.5) {
                // Spread
                gsap.to(particleGroup[i].position, {duration: 0.1, x: particleGroup[i].position.x + directionVector.x * 0.5, y: particleGroup[i].position.y + directionVector.y * 0.5})

                // Size Change
                gsap.to(particleGroup[i].material, {duration: 0.1, size: 0.15})
                gsap.to(particleGroup[i].material, {duration: 1, delay: 0.1, size: parameters.size})
                gsap.to(particleGroup[i].position, {duration: 1, delay: 0.1, x: originalPositions[i][0], y: originalPositions[i][1]})
            }
        } 

    })

    // Flip Indicator
    let flipValue = {
        value: 0
    }

    // --------------------------------------

    // Animate
    // --------------------------------------
    const clock = new THREE.Clock()

    const tick = () =>
    {
        const elapsedTime = clock.getElapsedTime()
        
        // Camera Movement
        // gsap.to(camera.rotation, {duration: 1, x: mouse.y * 0.01, y: - mouse.x * 0.01})

        if (flipValue.value < 0.5) {
            gsap.to('.businessCardFront', {duration: 0, pointerEvents: 'auto'})
            gsap.to('.businessCardBack', {duration: 0, pointerEvents: 'none'})
        }
        else {
            gsap.to('.businessCardFront', {duration: 0, pointerEvents: 'none'})
            gsap.to('.businessCardBack', {duration: 0, pointerEvents: 'auto'})
        }

        // Object Movement
        boxMesh.rotation.set(elapsedTime * boxRotations.x, elapsedTime * boxRotations.y, elapsedTime * boxRotations.z)
        boxBobbleGroup.position.y = Math.sin(elapsedTime) * 0.25

        tetraMesh.rotation.set(elapsedTime * tetraRotations.x, elapsedTime * tetraRotations.y, elapsedTime * tetraRotations.z)
        tetraBobbleGroup.position.y = Math.sin(elapsedTime + Math.PI/3) * 0.25

        sphereMesh.rotation.set(elapsedTime * sphereRotations.x, elapsedTime * sphereRotations.y, elapsedTime * sphereRotations.z)
        sphereBobbleGroup.position.y = Math.sin(elapsedTime + Math.PI*2/3) * 0.25

        // Render
        renderer.render(scene, camera)

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }

    // ScrollTriggers
    // -------------------------------------------------
    // gsap.fromTo(businessCardGroup.rotation, {y: 0}, {
    //     scrollTrigger: {
    //         trigger: '.mainBody',
    //         start: () =>  document.querySelector('.mainBody').clientHeight*0  + ' top',
    //         end: () =>  document.querySelector('.mainBody').clientHeight*1  + ' top',
    //         // toggleActions: "play none none reverse",
    //         // snap: true,
    //         scrub: true,
    //         // pin: false,
    //         // markers: true,
    //     },
    //     y: Math.PI,
    //     ease: 'none'
    // })

    gsap.fromTo(flipValue, {value: 0}, {
        scrollTrigger: {
            trigger: '.mainBody',
            start: () =>  document.querySelector('.mainBody').clientHeight*0  + ' top',
            end: () =>  document.querySelector('.mainBody').clientHeight*1  + ' top',
            // toggleActions: "play none none reverse",
            snap: true,
            scrub: true,
            // pin: false,
            // markers: true,
        },
        value: 1,
        ease: 'none'
    })

    gsap.fromTo('.businessCardFront', {rotateY: '0deg'}, {
        scrollTrigger: {
            trigger: '.mainBody',
            start: () =>  document.querySelector('.mainBody').clientHeight*0  + ' top',
            end: () =>  document.querySelector('.mainBody').clientHeight*1  + ' top',
            // toggleActions: "play none none reverse",
            snap: true,
            scrub: true,
            // pin: false,
            // markers: true,
        },
        rotateY: '180deg',
        ease: 'none'
    })

    gsap.fromTo('.businessCardBack', {rotateY: '-180deg'}, {
        scrollTrigger: {
            trigger: '.mainBody',
            start: () =>  document.querySelector('.mainBody').clientHeight*0  + ' top',
            end: () =>  document.querySelector('.mainBody').clientHeight*1  + ' top',
            // toggleActions: "play none none reverse",
            // snap: true,
            scrub: true,
            // pin: false,
            // markers: true
        },
        rotateY: '0deg',
        ease: 'none'
    })

    gsap.fromTo('.businessCardBack', {opacity: 0}, {
        scrollTrigger: {
            trigger: '.mainBody',
            start: () =>  document.querySelector('.mainBody').clientHeight*0.5  + ' top',
            toggleActions: "restart none none reverse",
            // snap: true,
            // scrub: true,
            // pin: false,
            // markers: true
        },
        duration: 0.01,
        opacity: 1,
        ease: 'none'
    })

    gsap.fromTo('.businessCardFront', {opacity: 1}, {
        scrollTrigger: {
            trigger: '.mainBody',
            start: () =>  document.querySelector('.mainBody').clientHeight*0.5  + ' top',
            toggleActions: "restart none none reverse",
            // snap: true,
            // scrub: true,
            // pin: false,
            // markers: true
        },
        duration: 0.01,
        opacity: 0,
        ease: 'none'
    })

    gsap.to('.businessCardBack', {duration: 0, opacity: 0})
    
    // Image Loader

    let images = document.images
    let len = images.length
    let counter = 0

    const incrementCounter = () => {
        counter++
        if ( counter >= (len - 1) ) {
            gsap.to('.loadingPage', {duration: 1, delay: 1, opacity: 0})
            setTimeout(() => {
                startupAnimations()
            }, 1000)
        }
    }

    for (let i = 0; i < images.length; i++) {
        if(images[i].complete) {
            incrementCounter()
        }
        else {
            images[i].addEventListener( 'load', () => {
                incrementCounter()
            }, false )
        }
    }

    tick()
}

frontCanvas()