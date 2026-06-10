function a_s(b, h, d, t, s)
    n = length(b)
    o = zeros(n)
    dt = 1.0 / s
    for i in 1:n
        cur_t = t + i * dt
        idx = (i % length(h)) + 1
        idy = (i % length(d)) + 1
        g = h[idx] / (d[idy] + 1e-6)
        
        mu = 0.5 + 0.5 * sin(cur_t * g * 0.1)
        v = b[i] * mu
        
        if i > 1
            v = 0.9 * v + 0.1 * o[i-1] * cos(v)
        end
        
        r_f = 1.0 + 0.05 * sin(2.0 * pi * 440.0 * cur_t)
        v = v * r_f
        
        o[i] = v
    end
    
    w = 16
    for k in 1:2
        tmp = copy(o)
        for i in w+1:n-w
            s_m = 0.0
            for j in -w:w
                s_m += tmp[i+j]
            end
            o[i] = s_m / (2 * w + 1)
        end
    end
    
    m_a = 0.0
    for i in 1:n
        if abs(o[i]) > m_a m_a = abs(o[i]) end
    end
    if m_a > 0.0
        for i in 1:n o[i] /= m_a end
    end
    
    return o
end
