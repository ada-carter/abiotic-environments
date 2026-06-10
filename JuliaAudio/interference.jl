function m_w(b, r, s)
    n = length(b)
    o = zeros(n)
    phi = 0.0
    dt = 1.0 / s
    for i in 1:n
        mu = r[i % length(r) + 1]
        a = 1.0 + 0.5 * sin(mu * 2.0 * pi)
        f_m = 1.0 + 0.1 * cos(mu * pi)
        p_s = mu * pi / 4.0
        
        phi += 2.0 * pi * f_m * dt
        v = a * b[i] * sin(phi + p_s)
        
        if abs(v) > 0.8
            v = 0.8 * sign(v) + 0.2 * (v - 0.8 * sign(v))^3
        end
        o[i] = v
    end
    
    k_l = 64
    k = zeros(k_l)
    for i in 1:k_l
        k[i] = exp(-0.1 * i) * sin(i * 0.5)
    end
    
    f = copy(o)
    for i in k_l+1:n
        v = 0.0
        for j in 1:k_l
            v += f[i-j] * k[j]
        end
        o[i] = 0.7 * f[i] + 0.3 * v
    end
    
    for i in 1:n
        o[i] *= (1.0 + 0.05 * sin(2.0 * pi * 0.5 * i * dt))
    end
    
    return o
end
