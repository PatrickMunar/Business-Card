gsap.registerPlugin(ScrollTrigger)

// Clear Scroll Memory
window.history.scrollRestoration = 'manual'

const mainColors = [
    [new THREE.Color(0x7676e4), new THREE.Color(0x45e2b6), '#7676e4', '#45e2b6', '#7676e410', '#7676e440'],
    [new THREE.Color(0x101820), new THREE.Color(0xffffff), '#101820', '#ffffff', '#10182010', '#10182040'],
    [new THREE.Color(0x00539C), new THREE.Color(0xFC766A), '#00539C', '#FC766A', '#00539C10', '#00539C40'], 
    [new THREE.Color(0xF93822), new THREE.Color(0xFDD20E), '#F93822', '#FDD20E', '#F9382210', '#F9382240'], 
    [new THREE.Color(0x6E6E6D), new THREE.Color(0xFAD0C9), '#6E6E6D', '#FAD0C9', '#6E6E6D10', '#6E6E6D40'], 
    [new THREE.Color(0x1D90F3), new THREE.Color(0xFFFE03), '#1D90F3', '#FFFE03', '#1D90F310', '#1D90F340'],
    [new THREE.Color(0xfe7f95), new THREE.Color(0xffe5ee), '#fe7f95', '#ffe5ee', '#fe7f9510', '#fe7f9540'],
]
let colorIndex = 1

const particleGroup = []
let boxMesh, tetraMesh, sphereMesh

const linksArray = []
const logosArray = []

for (let i = 0; i < mainColors.length; i++) {
    const x = new THREE.Group
    const y = new THREE.Group
    linksArray[i] = []
    linksArray[i][0] = x
    linksArray[i][1] = y

    const z = new THREE.Group
    logosArray[i] = z
}

// Flip Indicator
let flipValue = {
    value: 0
}

const interactiveJS = () => {
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

    let aspectRatio = window.innerWidth/window.innerHeight
    let scaleRatio = 1

    // Mobile Scaling
    if (window.innerWidth < 1100) {
        
        if (aspectRatio > 3.5/2) {
            gsap.to('.scaleCards', {duration: 0, scale: window.innerHeight/(1200 * 2/3.5)})
        }

        else {
            gsap.to('.scaleCards', {duration: 0, scale: window.innerWidth/1200})
        }
    }

    let prevWidth = window.innerWidth

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

        aspectRatio = window.innerWidth/window.innerHeight

        // Mobile Scaling
        if (window.innerWidth != prevWidth) {
            window.scrollTo(0, 0)
            if (window.innerWidth < 1100) {
                location.reload()
    
                if (aspectRatio > 3.5/2) {
                    scaleRatio = window.innerHeight/(1200 * 2/3.5)
                    gsap.to('.scaleCards', {duration: 0, scale: scaleRatio})
                }
    
                else {
                    scaleRatio = window.innerWidth/1200
                    gsap.to('.scaleCards', {duration: 0, scaleRatio})
                }
            }
        }

        else {
            if (window.innerWidth > 1300) {
                window.scrollTo(0, 0)
            } 
        }
    })

    // Loaders
    const textureLoader = new THREE.TextureLoader()

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

    // Link Events
    const links = document.querySelectorAll('.chainLink')
    const linkDivs = document.querySelectorAll('.linkDiv')

    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener('mouseenter', () => {
            gsap.to(linkDivs[i], {duration: 0.25, x: 5, y: -5, ease: 'Power1.easeOut'})
        })

        links[i].addEventListener('mouseleave', () => {
            gsap.to(linkDivs[i], {duration: 0.25, x: 0, y: 0, ease: 'Power1.easeOut'})
        })
    }

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

    tick()
}

interactiveJS()

const frontCanvas = () => {

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
    })

    // Loaders
    const textureLoader = new THREE.TextureLoader()

    // GLTF Loader
    const gltfLoader = new THREE.GLTFLoader()

    // 3D Objects
    // ----------------------------------------------------------------

    const boxGeometry = new THREE.BoxGeometry(0.75,0.75,0.75)
    const boxMaterial = new THREE.MeshStandardMaterial({
        color: mainColors[0][0],
        roughness: 1
    })
    boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)
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
    tetraMesh = new THREE.Mesh(tetraGeometry, tetraMaterial)
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
    sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial)
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
            color: mainColors[0][i%2],
            size: parameters.size,
            depthWrite: false,
            sizeAttenuation: true,
            transparent: true,
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

        // Light Movement
        gsap.to(directionalLight.position, {duration: 1, x: mouse.x * 10, y: mouse.y * 10})

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

    // --------------------------------------

    // Animate
    // --------------------------------------
    const clock = new THREE.Clock()

    const tick = () =>
    {
        const elapsedTime = clock.getElapsedTime()
        
        // Camera Movement
        // gsap.to(camera.rotation, {duration: 1, x: mouse.y * 0.01, y: - mouse.x * 0.01})

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
   
    window.addEventListener('load', () => {
        gsap.to('.loadingPage', {duration: 1, delay: 1, opacity: 0})
        setTimeout(() => {
            startupAnimations()
        }, 2000)
    }) 

    tick()
}

frontCanvas()

const backCanvas = () => {

    // Canvas
        // Change '.webgl' with a canvas querySelector
    const canvas = document.querySelector('.backCanvas')

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
        width: 1600,
        height: 1100
    }

    let isPortrait = false

    if (window.innerWidth < window.innerHeight) {
        isPortrait = true
    }

    window.addEventListener('resize', () => {    
        // Update sizes
        sizes.width = 1600
        sizes.height = 1100

        // Update camera
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()

        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })

    gsap.to('.backCanvas', {duration: 0, y: -236})

    // Loaders
    const textureLoader = new THREE.TextureLoader()

    // GLTF Loader
    const gltfLoader = new THREE.GLTFLoader()

    // Logo
    const logosParallaxGroup = new THREE.Group
    scene.add(logosParallaxGroup)

    const logosSpringGroup = new THREE.Group
    logosParallaxGroup.add(logosSpringGroup)

    const logosGroup = new THREE.Group
    logosSpringGroup.add(logosGroup)

    logosGroup.position.set(2.75,-1.7,2)
    logosGroup.rotation.set(0, -Math.PI/3, Math.PI/6)

    // Chain
    const chainSpringGroup = new THREE.Group
    scene.add(chainSpringGroup)

    chainSpringGroup.rotation.set(Math.PI/9, 0, Math.PI/9)
    chainSpringGroup.rotation.set(Math.PI/9, 0, Math.PI/9)
    chainSpringGroup.position.set(2, -2, 0)

    const chainTiltGroup = new THREE.Group
    chainSpringGroup.add(chainTiltGroup)

    chainTiltGroup.position.y = -2.5
    chainTiltGroup.position.x = -0.5
    
    let chainScale = 0.05

    for (let i = 0; i < mainColors.length; i++) {

        // Chain
        gltfLoader.load(
            './gltf/MainLinks.glb',
            (obj) => {
                obj.scene.scale.set(chainScale, chainScale, chainScale)
    
                linksArray[i][0].add(obj.scene)
                obj.scene.children[0].material.color = mainColors[i][0]
            }
        )

        gltfLoader.load(
            './gltf/SubLinks.glb',
            (obj) => {
                obj.scene.scale.set(chainScale, chainScale, chainScale)
    
                linksArray[i][1].add(obj.scene)
                obj.scene.children[0].material.color = mainColors[i][1]
            }
        )

        // Logo
        gltfLoader.load(
            './gltf/MainLogo.glb',
            (obj) => {
                obj.scene.scale.set(chainScale * 0.4, chainScale * 0.4, chainScale * 0.4)
    
                logosArray[i].add(obj.scene)
                obj.scene.children[0].material.color = mainColors[i][0]
            }
        )

        if (i == 0) {
            chainTiltGroup.add(linksArray[i][0])
            chainTiltGroup.add(linksArray[i][1])

            logosGroup.add(logosArray[i])
        }
    }

    let linkIndex = 0

    const linkChange = () => {
        // Chain
        chainTiltGroup.remove(linksArray[linkIndex][0])
        chainTiltGroup.remove(linksArray[linkIndex][1])

        // Logo
        logosGroup.remove(logosArray[linkIndex])

        if (linkIndex < mainColors.length - 1) {
            linkIndex++
        }
        else {
            linkIndex = 0
        }

        chainTiltGroup.add(linksArray[linkIndex][0])
        chainTiltGroup.add(linksArray[linkIndex][1])

        logosGroup.add(logosArray[linkIndex])
    }

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

    const startupAnimations = () => {

    }

    // Events
    // --------------------------------------

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
                linkChange()
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
                linkChange()
            }
        }
    })

    // Mail To Events
    let mailString = ''

    const mailToEvents = (name, about, message, card, work) => {
        mailString = 'mailto:bznz.patrickmunar@gmail.com?subject=From bznzcard.patrickmunar.com: '+ about +'&Body=Hi! I am '+ name +'.%0d%0a%0d%0aI just want to say '+ message +'%0d%0a%0d%0a'

        if (card == true || work == true) {
            mailString += 'Lastly, '
        }

        if (card == true) {
            mailString += 'I would like a card of my own'
            if (work == true) {
                mailString += ', and '
            }
            else {
                mailString += '!'
            }
        }

        if (work == true) {
            mailString += "let's make cool stuff together!"
        }

        document.querySelector('.mailToLink').href = mailString
    }
    
    // Form Events
    let formName = ''
    document.querySelector('#name').oninput = () => {
        formName = document.querySelector('#name').value
    }

    let formAbout = ''
    document.querySelector('#about').oninput = () => {
        formAbout = document.querySelector('#about').value
    }

    let formMessage = ''
    document.querySelector('#message').oninput = () => {
        formMessage = document.querySelector('#message').value
    }

    // Checkbox Events
    let isCardCBTicked = false

    document.querySelector('#cardCheckbox').addEventListener('click', () => {
        if (isCardCBTicked == false) {
            isCardCBTicked = true
            gsap.to('#cardTick', {duration: 0.05, opacity: 1})
        }
        else {
            isCardCBTicked = false
            gsap.to('#cardTick', {duration: 0.05, opacity: 0})
        }
    })

    let isWorkCBTicked = false

    document.querySelector('#workCheckbox').addEventListener('click', () => {
        if (isWorkCBTicked == false) {
            isWorkCBTicked = true
            gsap.to('#workTick', {duration: 0.05, opacity: 1})
        }
        else {
            isWorkCBTicked = false
            gsap.to('#workTick', {duration: 0.05, opacity: 0})
        }
    })
    
    // Submit Events
    let buzzTime = 0.2
    let shadowIndex = 0

    document.querySelector('.submitButtonDiv').addEventListener('mouseenter', () => {
        gsap.to('.submitButtonDiv', {duration: 0, borderWidth: '2px', ease: 'Power1.easeOut'})
        if (formName != '') {
            if (formAbout != '') {
                if (formMessage != '') {
                    gsap.to('.submitBackground', {duration: 0.5, x: 0, ease: 'Power1.easeOut'})
                    gsap.to('.mailToLink', {duration: 0, pointerEvents: 'auto'})
                    mailToEvents(formName, formAbout, formMessage, isCardCBTicked, isWorkCBTicked)
                }
                else {
                    if (colorIndex != 0) {
                        shadowIndex = colorIndex - 1
                    }
                    else {
                        shadowIndex = mainColors.length - 1
                    }
                    gsap.to('textarea', {duration: buzzTime, boxShadow: '0 0 3px 3px ' + mainColors[shadowIndex][2]})
                    gsap.to('textarea', {duration: buzzTime, delay: buzzTime, boxShadow: '0 0 1px 0px ' + mainColors[shadowIndex][2]})
                    gsap.to('textarea', {duration: buzzTime, delay: buzzTime * 2, boxShadow: '0 0 3px 3px ' + mainColors[shadowIndex][2]})
                    gsap.to('textarea', {duration: buzzTime, delay: buzzTime * 3, boxShadow: '0 0 1px 0px ' + mainColors[shadowIndex][2]})
                }
            }
            else {
                gsap.to('#aboutUnderline', {duration: buzzTime, scaleY: 5})
                gsap.to('#aboutUnderline', {duration: buzzTime, delay: buzzTime, scaleY: 1})
                gsap.to('#aboutUnderline', {duration: buzzTime, delay: buzzTime * 2, scaleY: 5})
                gsap.to('#aboutUnderline', {duration: buzzTime, delay: buzzTime * 3, scaleY: 1})
            }
        }
        else {
            gsap.to('#nameUnderline', {duration: buzzTime, scaleY: 5})
            gsap.to('#nameUnderline', {duration: buzzTime, delay: buzzTime, scaleY: 1})
            gsap.to('#nameUnderline', {duration: buzzTime, delay: buzzTime * 2, scaleY: 5})
            gsap.to('#nameUnderline', {duration: buzzTime, delay: buzzTime * 3, scaleY: 1})
        }
    })

    document.querySelector('.submitButtonDiv').addEventListener('mouseleave', () => {
        gsap.to('.submitBackground', {duration: 0.5, x: -300, ease: 'Power1.easeOut'})
        gsap.to('.submitButtonDiv', {duration: 0, borderWidth: '1px', ease: 'Power1.easeOut'})
        gsap.to('.mailToLink', {duration: 0, pointerEvents: 'none'})
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

        // All Links
        for (let i = 0; i < mainColors.length; i++) {
            gsap.to(linksArray[i][0].rotation, {duration: 1, y: mouse.x * Math.PI * 2})
            gsap.to(linksArray[i][1].rotation, {duration: 1, y: mouse.x * Math.PI * 2})
            gsap.to(linksArray[i][0].position, {duration: 1, y: mouse.y * 0.5})
            gsap.to(linksArray[i][1].position, {duration: 1, y: mouse.y * 0.5})
        }

        for (let i = 0; i < mainColors.length; i++) {
            gsap.to(logosArray[i].position, {duration: 2, y: mouse.y * 0.15, x: mouse.x * 0.075})
        }

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

    })

    // --------------------------------------

    // Animate
    // --------------------------------------
    const clock = new THREE.Clock()

    const tick = () =>
    {
        const elapsedTime = clock.getElapsedTime()

        if (flipValue.value < 0.5) {
            gsap.to('.businessCardFront', {duration: 0, pointerEvents: 'auto'})
            gsap.to('.businessCardBack', {duration: 0, pointerEvents: 'none'})
        }
        else {
            gsap.to('.businessCardFront', {duration: 0, pointerEvents: 'none'})
            gsap.to('.businessCardBack', {duration: 0, pointerEvents: 'auto'})
        }

        for (let i = 0; i < mainColors.length; i++) {
            gsap.to(logosArray[i].rotation, {duration: 9, x: Math.sin(elapsedTime) * 0.2, y: Math.cos(elapsedTime) * 0.2})
        }

        // Camera Movement
        // gsap.to(camera.rotation, {duration: 1, x: mouse.y * 0.01, y: - mouse.x * 0.01})

        // Object Movement

        // Render
        renderer.render(scene, camera)

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }

    gsap.fromTo(chainTiltGroup.position, {y: -4}, {
        scrollTrigger: {
            trigger: '.mainBody',
            start: () =>  document.querySelector('.mainBody').clientHeight*0  + ' top',
            end: () =>  document.querySelector('.mainBody').clientHeight*1  + ' top',
            // toggleActions: "play none none reverse",
            // snap: true,
            scrub: true,
            // pin: false,
        },
        y: 0,
        ease: 'none'
    })

    gsap.fromTo(chainTiltGroup.rotation, {y: Math.PI * 3}, {
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
        y: 0,
        ease: 'none'
    })

    gsap.fromTo(logosSpringGroup.position, {y: -1, z: -3}, {
        scrollTrigger: {
            trigger: '.mainBody',
            start: () =>  document.querySelector('.mainBody').clientHeight*0  + ' top',
            end: () =>  document.querySelector('.mainBody').clientHeight*1  + ' top',
            // toggleActions: "play none none reverse",
            // snap: true,
            scrub: true,
            // pin: false,
        },
        y: 0, z: 0,
        ease: 'none'
    })

    tick()
}

backCanvas()

// Color Change
const colorChange = (x) => {
    gsap.to('.mainColor', {duration: 0, color: mainColors[x][2]})
    gsap.to('.mainBGColor', {duration: 0, backgroundColor: mainColors[x][2]})
    gsap.to('.subBGColor', {duration: 0, backgroundColor: mainColors[x][3]})
    gsap.to('.subColor', {duration: 0, color: mainColors[x][3]})
    gsap.to('.cardBGColor', {duration: 0, backgroundColor: mainColors[x][4]})
    gsap.to('.sliderBGColor', {duration: 0, backgroundColor: mainColors[x][5]})

    gsap.to('textarea', {duration: 0, outlineColor: mainColors[x][2], borderColor: mainColors[x][2], backgroundColor: 'transparent'})
    gsap.to('input', {duration: 0, outlineColor: mainColors[x][2]})
    document.styleSheets[0].cssRules[77].style.backgroundColor = mainColors[x][2]
    gsap.to('.linkDivDupe', {duration: 0, borderColor: mainColors[x][2]})
    gsap.to('.submitButtonDiv', {duration: 0, borderColor: mainColors[x][2]})
    gsap.to('.checkbox', {duration: 0, borderColor: mainColors[x][2]})
    gsap.to('.submitBackground', {duration: 0, backgroundColor: mainColors[x][3]})

    gsap.to('.logoSVGPath', {duration: 0, stroke: mainColors[x][3]})

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