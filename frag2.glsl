varying vec2 vUv;

void main() {
    vec2 nUv = vUv - 0.5;
    float d = distance(nUv, vec2(0.));
    // d = pow(d, .5);
    d = 1. - d;
    gl_FragColor = vec4(vec3(d), 1.);
}